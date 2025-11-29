const express = require('express'); // framework like Spring Boot
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../auth");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/upload', upload.array('file'), async (req, res) => {
    let {feedId} = req.body;
    const files = req.files;
    // const filename = req.file.filename; 
    // const destination = req.file.destination; 
    try{
        let results = [];
        let host = `${req.protocol}://${req.get("host")}/`;
        for(let file of files){
            let filename = file.filename;
            let destination = file.destination;
            let query = "INSERT INTO TBL_FEED_IMG VALUES(NULL, ?, ?, ?)";
            let result = await db.query(query, [feedId, filename, host+destination+filename]);
            results.push(result);
        }
        res.json({
            message : "result",
            result : results
        });
    } catch(err){
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
});

router.get("/:userId", async (req, res) => {
    let {userId} = req.params;
    try {
        // 1️⃣ Get all posts with user info
        let [feeds] = await db.query(`
            SELECT F.*, U.USERID, U.USERNAME, U.IMGPATH AS USER_IMG,
            (SELECT COUNT(*) FROM TBL_LIKES WHERE postId = F.id) AS likeCount,
            (SELECT COUNT(*) FROM TBL_LIKES L WHERE L.postId = F.id AND L.userId = ?) AS isLikedByUser
            FROM TBL_FEED F
            INNER JOIN TBL_USER U ON F.USERID = U.USERID
            ORDER BY F.cDatetime DESC
        `,[userId]);

        // 2️⃣ Get all images for these posts
        const feedIds = feeds.map(f => f.id); // extract all post IDs

        let images = [];
        if (feedIds.length > 0) {
            [images] = await db.query(`
                SELECT * FROM TBL_FEED_IMG 
                WHERE FEEDID IN (?)
            `, [feedIds]);
            //  console.log("Found images:", images); // DEBUG: Check what images are returned
        }

        // 3️⃣ Attach images to each post
        const posts = feeds.map(feed => {
            return {
                ...feed,
                images: images
                    .filter(img => img.feedId === feed.id)
                    .map(img => ({
                        imgId: img.imgNo,
                        imgPath: img.imgPath,
                        imgName: img.imgName
                    }))
            };
        });

        // 4️⃣ Send JSON
        res.json({
            result: "success",
            list: posts
        });

    } catch (error) {
        console.log(error);
        res.json({ result: "error" });
    }
});

router.delete("/:postId", async (req, res) =>{
    let {postId} = req.params;
    try {
        let sql = "DELETE FROM TBL_FEED WHERE ID = ?";
        let result = await db.query(sql, [postId]);
        res.json({
            result : "success"
        });
    } catch (error) {
        console.log(error);
    }

})

router.delete('/image/:imgId', async (req, res) => {
    const { imgId } = req.params;
    console.log("img no == >", imgId);
    try {
        await db.query("DELETE FROM TBL_FEED_IMG WHERE IMGNO = ?", [imgId]);
        res.json({ result: "success" });
    } catch(err) {
        console.log(err);
        res.status(500).json({ result: "error" });
    }
});

router.post("/likes", async (req, res) => {
    const { postId, userId } = req.body;
    console.log("What is the body ==>", req.body);
    try {
        // Check if already liked
        const checkSql = "SELECT * FROM TBL_LIKES WHERE postId = ? AND userId = ?";
        const [rows] = await db.query(checkSql, [postId, userId]);

        if (rows.length > 0) {
            // Already liked → UNLIKE (DELETE)
            const deleteSql = "DELETE FROM TBL_LIKES WHERE postId = ? AND userId = ?";
            await db.query(deleteSql, [postId, userId]);

            return res.json({ liked: false }); // now unliked
        } else {
            // Not liked → LIKE (INSERT)
            const insertSql = "INSERT INTO TBL_LIKES (postId, userId) VALUES (?, ?)";
            await db.query(insertSql, [postId, userId]);

            return res.json({ liked: true }); // now liked
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
});

router.post('/:userId', async (req, res) => {
    let {userId} = req.params;
    let { content, title, address, restaurant } = req.body;
    console.log(req.body);
    try {
        let sql = "INSERT INTO TBL_FEED (USERID, CONTENT, CDATETIME, TITLE, ADDRESS, RESTAURANT) VALUES(?, ?, NOW(), ?, ?, ?)";
        let result = await db.query(sql, [userId, content, title, address, restaurant]);
        // console.log("What has been posted ==>", result);
        res.json({
            msg : "추가되었습니다 !",
            result : result
        });
    } catch (error) {
        console.log(error);
    }
})

// router.put("/:userId", async (req, res) =>{
//     let {userId} = req.params;
//     let {postId, content, title, address, restaurant} = req.body;
//     try {
//         let sql = "UPDATE TBL_FEED SET CONTENT = ?, TITLE = ?, ADDRESS = ?, RESTAURANT = ? WHERE USERID = ? AND ID = ?";
//         let result = await db.query(sql, [content, title, address, restaurant, userId, postId]);
//         res.json({
//             result : "success"
//         });
//     } catch (error) {
//         console.log(error);
//     }

// })

router.put("/:userId", async (req, res) =>{
    let {userId} = req.params;
    let {postId, content, title, address, restaurant, deletedImages} = req.body;
    console.log("Making sure the deleted images are an actual array? ==>", deletedImages);

    try {
        // 1️⃣ Update the post content
        await db.query(
            "UPDATE TBL_FEED SET CONTENT = ?, TITLE = ?, ADDRESS = ?, RESTAURANT = ? WHERE USERID = ? AND ID = ?",
            [content, title, address, restaurant, userId, postId]
        );

        // 2️⃣ Delete removed images if any
        if (deletedImages && deletedImages.length > 0) {
            const [rows] = await db.query(`SELECT IMGNAME FROM TBL_FEED_IMG WHERE IMGNO IN (?)`, [deletedImages]);
            const fs = require("fs");
            for (let row of rows) {
                const path = "uploads/" + row.IMGNAME;
                if (fs.existsSync(path)) fs.unlinkSync(path);
            }
            await db.query("DELETE FROM TBL_FEED_IMG WHERE IMGNO IN (?)", [deletedImages]); 
        }

        res.json({ result: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: "error" });
    }
});



module.exports = router;