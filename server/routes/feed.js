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
    const keyword = req.query.keyword || '';  // Get from query string
    const searchTerm = `%${keyword}%`;
    let sql, params;
    try {

        if (keyword) {
            // Search query
            sql = "SELECT F.*, U.USERID, U.USERNAME, U.IMGPATH AS USER_IMG, " +
                  "(SELECT COUNT(*) FROM TBL_LIKES WHERE POSTID = F.ID) AS likeCount, " +
                  "(SELECT COUNT(*) FROM TBL_LIKES L WHERE L.POSTID = F.ID AND L.USERID = ?) AS isLikedByUser, " +
                  "CASE WHEN S.USERID IS NOT NULL THEN 1 ELSE 0 END AS isSavedByUser " +
                  "FROM TBL_FEED F " +
                  "INNER JOIN TBL_USER U ON F.USERID = U.USERID " +
                  "LEFT JOIN TBL_SAVED S ON S.POSTID = F.ID AND S.USERID = ? " +
                  "WHERE (F.TITLE LIKE ? OR F.RESTAURANT LIKE ? OR F.ADDRESS LIKE ? OR F.CONTENT LIKE ?) " +
                  "ORDER BY F.CDATETIME DESC";
            params = [userId, userId, searchTerm, searchTerm, searchTerm, searchTerm];
        } else {
            // All posts query
            sql = "SELECT F.*, U.USERID, U.USERNAME, U.IMGPATH AS USER_IMG, " +
                  "(SELECT COUNT(*) FROM TBL_LIKES WHERE POSTID = F.ID) AS likeCount, " +
                  "(SELECT COUNT(*) FROM TBL_LIKES L WHERE L.POSTID = F.ID AND L.USERID = ?) AS isLikedByUser, " +
                  "CASE WHEN S.USERID IS NOT NULL THEN 1 ELSE 0 END AS isSavedByUser " +
                  "FROM TBL_FEED F " +
                  "INNER JOIN TBL_USER U ON F.USERID = U.USERID " +
                  "LEFT JOIN TBL_SAVED S ON S.POSTID = F.ID AND S.USERID = ? " +
                  "ORDER BY F.CDATETIME DESC";
            params = [userId, userId];
        }

        let [feeds] = await db.query(sql, params);

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

        let tags = [];
        if (feedIds.length > 0) {
            [tags] = await db.query(`
                SELECT 
                    PC.POST_ID,
                    C.CATEGORY_ID,
                    C.CATEGORY_NAME
                FROM TBL_POST_CATEGORY PC
                INNER JOIN TBL_CATEGORY C ON PC.CATEGORY_ID = C.CATEGORY_ID
                WHERE PC.POST_ID IN (?)
            `, [feedIds]);
            console.log("Tags fetched:", tags);
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
                    })),
                tags: tags
                    .filter(tag => tag.POST_ID === feed.id)
                    .map(tag => ({
                        categoryId: tag.CATEGORY_ID,
                        categoryName: tag.CATEGORY_NAME
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
    const keyword = req.query.keyword || '';  // ✅ Add this
    const searchTerm = `%${keyword}%`; 
    
  try {

    let sql, params;
    if (keyword) {
            // ✅ Saved posts WITH search
            sql = "SELECT F.*, U.USERID, U.USERNAME, U.IMGPATH AS USER_IMG, " +
                  "(SELECT COUNT(*) FROM TBL_LIKES WHERE POSTID = F.ID) AS likeCount, " +
                  "(SELECT COUNT(*) FROM TBL_LIKES L WHERE L.POSTID = F.ID AND L.USERID = ?) AS isLikedByUser, " +
                  "CASE WHEN S.USERID IS NOT NULL THEN 1 ELSE 0 END AS isSavedByUser " +
                  "FROM TBL_FEED F " +
                  "INNER JOIN TBL_USER U ON F.USERID = U.USERID " +
                  "INNER JOIN TBL_SAVED S2 ON S2.POSTID = F.ID AND S2.USERID = ? " + 
                  "LEFT JOIN TBL_SAVED S ON S.POSTID = F.ID AND S.USERID = ? " +
                  "WHERE (F.TITLE LIKE ? OR F.RESTAURANT LIKE ? OR F.ADDRESS LIKE ? OR F.CONTENT LIKE ?) " +  // ✅ Add WHERE clause
                  "ORDER BY F.CDATETIME DESC";
            params = [userId, userId, userId, searchTerm, searchTerm, searchTerm, searchTerm];
        } else {
            // Saved posts WITHOUT search (your original query)
            sql = "SELECT F.*, U.USERID, U.USERNAME, U.IMGPATH AS USER_IMG, " +
                  "(SELECT COUNT(*) FROM TBL_LIKES WHERE POSTID = F.ID) AS likeCount, " +
                  "(SELECT COUNT(*) FROM TBL_LIKES L WHERE L.POSTID = F.ID AND L.USERID = ?) AS isLikedByUser, " +
                  "CASE WHEN S.USERID IS NOT NULL THEN 1 ELSE 0 END AS isSavedByUser " +
                  "FROM TBL_FEED F " +
                  "INNER JOIN TBL_USER U ON F.USERID = U.USERID " +
                  "INNER JOIN TBL_SAVED S2 ON S2.POSTID = F.ID AND S2.USERID = ? " + 
                  "LEFT JOIN TBL_SAVED S ON S.POSTID = F.ID AND S.USERID = ? " +   
                  "ORDER BY F.CDATETIME DESC";
            params = [userId, userId, userId];
        }


    // pass userId three times for the three placeholders
    const [feeds] = await db.execute(sql, params);

    // 2) Get images for those feeds (if any)
    const feedIds = feeds.map(f => f.id);

    console.log("=== FEED DEBUG ===");
    console.log("Number of feeds:", feeds.length);
    console.log("Feed IDs:", feedIds);
    console.log("Feed IDs length:", feedIds.length);

    let images = [];
        if (feedIds.length > 0) {
            [images] = await db.query(`
                SELECT * FROM TBL_FEED_IMG 
                WHERE FEEDID IN (?)
            `, [feedIds]);
            //  console.log("Found images:", images); // DEBUG: Check what images are returned
        }

    // 3) Get all tags/categories for these posts    
    let tags = [];
    console.log("About to fetch tags...");
        if (feedIds.length > 0) {
            console.log("Fetching tags for feed IDs:", feedIds);
            [tags] = await db.query(`
                SELECT 
                    PC.POST_ID,
                    C.CATEGORY_ID,
                    C.CATEGORY_NAME
                FROM TBL_POST_CATEGORY PC
                INNER JOIN TBL_CATEGORY C ON PC.CATEGORY_ID = C.CATEGORY_ID
                WHERE PC.POST_ID IN (?)
            `, [feedIds]);
            console.log("=== TAGS DEBUG ===");
            console.log("Feed IDs:", feedIds);
            console.log("Tags fetched from DB:", tags);
        }

    // 3) Attach images AND tags to each post
    const posts = feeds.map(feed => {
            return {
                ...feed,
                images: images
                    .filter(img => img.feedId === feed.id)
                    .map(img => ({
                        imgId: img.imgNo,
                        imgPath: img.imgPath,
                        imgName: img.imgName
                    })),
                tags: tags
                    .filter(tag => tag.POST_ID === feed.id)
                    .map(tag => ({
                        categoryId: tag.CATEGORY_ID,
                        categoryName: tag.CATEGORY_NAME
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
            "SELECT * FROM TBL_SAVED WHERE POSTID = ? AND USERID = ?",
            [postId, userId]
        );

        if (rows.length > 0) {
            // Already saved → unsave (delete)
            await db.execute(
                "DELETE FROM TBL_SAVED WHERE POSTID = ? AND USERID = ?",
                [postId, userId]
            );
            return res.json({ result: "success", saved: false });
        } else {
            // Not saved → save (insert)
            await db.execute(
                "INSERT INTO TBL_SAVED (POSTID, USERID, CREATEDAT) VALUES (?, ?, NOW())",
                [postId, userId]
            );
            return res.json({ result: "success", saved: true });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ result: "error", message: "Database error" });
    }
});

async function getOrCreateCategory(categoryName) {
    // Check if category exists
    let [existing] = await db.query(
        "SELECT CATEGORY_ID FROM TBL_CATEGORY WHERE CATEGORY_NAME = ?",
        [categoryName]
    );
    
    if (existing.length > 0) {
        return existing[0].CATEGORY_ID;
    }
    
    // Create new category
    let [result] = await db.query(
        "INSERT INTO TBL_CATEGORY (CATEGORY_NAME) VALUES (?)",
        [categoryName]
    );
    
    return result.insertId;
}

// router.post('/:userId', async (req, res) => {
//     let {userId} = req.params;
//     let { content, title, address, restaurant, tags } = req.body;
//     console.log("What is in the body before I insert ==>",req.body);
//     try {
//         // 1) Insert the post
//         let sql = "INSERT INTO TBL_FEED (USERID, CONTENT, CDATETIME, TITLE, ADDRESS, RESTAURANT) VALUES(?, ?, NOW(), ?, ?, ?)";
//         let result = await db.query(sql, [userId, content, title, address, restaurant]);
//         let postId = result.insertId;
//         // 2) Insert tags if provided
//         if (tags && Array.isArray(tags) && tags.length > 0) {
//             for (let tagName of tags) {
//                 // Get or create the category
//                 let categoryId = await getOrCreateCategory(tagName);
                
//                 // Link post to category
//                 await db.query(
//                     "INSERT INTO TBL_POST_CATEGORY (POST_ID, CATEGORY_ID) VALUES (?, ?)",
//                     [postId, categoryId]
//                 );
//             }
//         }
//         res.json({
//             msg : "추가되었습니다 !",
//             result : result
//         });
//     } catch (error) {
//         console.log(error);
//     }
// })

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

router.post('/:userId', async (req, res) => {
    let {userId} = req.params;
    let { content, title, address, restaurant, tags } = req.body;
    console.log("What is in the body before I insert ==>", req.body);
    
    try {
        // 1) Insert the post - use array destructuring
        let sql = "INSERT INTO TBL_FEED (USERID, CONTENT, CDATETIME, TITLE, ADDRESS, RESTAURANT) VALUES(?, ?, NOW(), ?, ?, ?)";
        let [result] = await db.query(sql, [userId, content, title, address, restaurant]);
        //  ^^^^^^ Add brackets to destructure
        
        let postId = result.insertId;
        console.log("New post ID:", postId);
        
        if (!postId) {
            throw new Error("Failed to get post ID after insert");
        }
        
        // 2) Insert tags if provided
        if (tags && Array.isArray(tags) && tags.length > 0) {
            console.log("Processing tags:", tags);
            
            for (let tagName of tags) {
                let categoryId = await getOrCreateCategory(tagName);
                console.log(`Linking post ${postId} to category ${categoryId}`);
                
                await db.query(
                    "INSERT INTO TBL_POST_CATEGORY (POST_ID, CATEGORY_ID) VALUES (?, ?)",
                    [postId, categoryId]
                );
            }
        }
        
        res.json({
            msg: "추가되었습니다 !",
            result: result,
            postId: postId
        });
    } catch (error) {
        console.log("Error creating post:", error);
        res.status(500).json({ error: "Failed to create post", details: error.message });
    }
});

router.put("/:userId", async (req, res) =>{
    let {userId} = req.params;
    let {postId, content, title, address, restaurant, deletedImages, tags} = req.body;
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

         // ✅ 3️⃣ Update tags if provided
         if (tags !== undefined && tags !== null && Array.isArray(tags)) {
            console.log("Updating tags to:", tags);
            
            // Delete all existing tags for this post
            await db.query("DELETE FROM TBL_POST_CATEGORY WHERE POST_ID = ?", [postId]);
            
            // Insert new tags (only if there are any)
            if (tags.length > 0) {
                for (let tagName of tags) {
                    let categoryId = await getOrCreateCategory(tagName);
                    await db.query(
                        "INSERT INTO TBL_POST_CATEGORY (POST_ID, CATEGORY_ID) VALUES (?, ?)",
                        [postId, categoryId]
                    );
                }
            }
        } else {
            console.log("No tags provided in request, skipping tag update");
        }

        res.json({ result: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: "error" });
    }
});


module.exports = router;