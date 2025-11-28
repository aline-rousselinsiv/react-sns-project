const express = require('express'); // framework like Spring Boot
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../auth");
const multer = require('multer');

router.get("/:postId", async (req, res) =>{
    let {postId} = req.params;
    try {
        let sql = "SELECT C.*, U.*  FROM TBL_COMMENTS C INNER JOIN TBL_USER U ON U.USERID = C.USER_ID WHERE POST_ID = ?";
        let [list] = await db.query(sql, [postId]);
        // console.log(list);
        res.json({
            result : "success", 
            list : list
        });
    } catch (error) {
        console.log(error);
    }

})

router.post("/:userId", async (req, res) => {
    let { userId } = req.params;
    let { postId, content } = req.body;

    try {
        let sql = "INSERT INTO TBL_COMMENTS (POST_ID, USER_ID, CONTENT) VALUES(?, ?, ?)";
        let result = await db.query(sql, [postId, userId, content]);

        res.json({
            result: "success"
        });
    } catch (error) {
        console.log("DB Error:", error);
        res.status(500).json({ result: "error", message: error.message });
    }
});

router.delete("/:commentId", async (req, res) =>{
    let {commentId} = req.params;
    try {
        let sql = "DELETE FROM TBL_COMMENTS WHERE COMMENT_ID = ?";
        let result = await db.query(sql, [commentId]);
        res.json({
            result : "success"
        });
    } catch (error) {
        console.log(error);
    }

})

module.exports = router;