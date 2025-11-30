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
        let sql = "SELECT F.*, U.USERID, U.USERNAME, U.IMGPATH AS USER_IMG, " +
                "(SELECT COUNT(*) FROM TBL_LIKES WHERE POST_ID = F.ID) AS likeCount, " +
                "(SELECT COUNT(*) FROM TBL_LIKES L WHERE L.POSTID = F.ID AND L.USERID = ?) AS isLikedByUser, " +
                "CASE WHEN S.USER_ID IS NOT NULL THEN 1 ELSE 0 END AS isSavedByUser " +
                "FROM TBL_FEED F " +
                "INNER JOIN TBL_USER U ON F.USERID = U.USERID " +
                "LEFT JOIN TBL_SAVED S ON S.POST_ID = F.ID AND S.USER_ID = ? " +
                "ORDER BY F.CDATETIME DESC";
        let [feeds] = await db.query(sql,[userId, userId]);

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

// get saved posts

// Add near your other routes in feed router file (e.g. routes/feed.js)

router.get("/saved/:userId", async (req, res) => {
    const { userId } = req.params;

  try {
    let sql = "SELECT F.*, U.USERID, U.USERNAME, U.IMGPATH AS USER_IMG, " +
              "(SELECT COUNT(*) FROM TBL_LIKES WHERE POSTID = F.ID) AS likeCount, " +
              "(SELECT COUNT(*) FROM TBL_LIKES L WHERE L.POSTID = F.ID AND L.USERID = ?) AS isLikedByUser, " +
              "CASE WHEN S.USER_ID IS NOT NULL THEN 1 ELSE 0 END AS isSavedByUser " +
              "FROM TBL_FEED F " +
              "INNER JOIN TBL_USER U ON F.USERID = U.USERID " +
              "INNER JOIN TBL_SAVED S2 ON S2.POST_ID = F.ID AND S2.USER_ID = ? " + 
              "LEFT JOIN TBL_SAVED S ON S.POST_ID = F.ID AND S.USER_ID = ? " +   
              "ORDER BY F.CDATETIME DESC";

    // pass userId three times for the three placeholders
    const [feeds] = await db.execute(sql, [userId, userId, userId]);

    // 2) Get images for those feeds (if any)
    const feedIds = feeds.map(f => f.id);

    let images = [];
        if (feedIds.length > 0) {
            [images] = await db.query(`
                SELECT * FROM TBL_FEED_IMG 
                WHERE FEEDID IN (?)
            `, [feedIds]);
            //  console.log("Found images:", images); // DEBUG: Check what images are returned
        }

    // 3) attach images to their posts
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

    return res.json({ result: "success", list: posts });
  } catch (err) {
    console.error("Error in /feed/saved/:userId", err);
    return res.status(500).json({ result: "error", message: "Server error" });
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

router.post("/saved", async (req, res) => {
    const { postId, userId } = req.body;
    console.log("What is in the body when I save a post? ==>", req.body);

    // if (!postId || !userId) {
    //     return res.status(400).json({ result: "error", message: "Missing postId or userId" });
    // }

    try {
        // Check if this post is already saved by this user
        const [rows] = await db.execute(
            "SELECT * FROM TBL_SAVED WHERE POST_ID = ? AND USER_ID = ?",
            [postId, userId]
        );

        if (rows.length > 0) {
            // Already saved → unsave (delete)
            await db.execute(
                "DELETE FROM TBL_SAVED WHERE POST_ID = ? AND USER_ID = ?",
                [postId, userId]
            );
            return res.json({ result: "success", saved: false });
        } else {
            // Not saved → save (insert)
            await db.execute(
                "INSERT INTO TBL_SAVED (POST_ID, USER_ID, CREATED_AT) VALUES (?, ?, NOW())",
                [postId, userId]
            );
            return res.json({ result: "success", saved: true });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ result: "error", message: "Database error" });
    }
});

router.post('/:userId', async (req, res) => {
    let {userId} = req.params;
    let { content, title, address, restaurant } = req.body;
    console.log("What is in the body before I insert ==>",req.body);
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