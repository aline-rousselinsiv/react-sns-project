const express = require('express'); // framework like Spring Boot
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../auth");

router.get("/:userId", async (req, res) =>{
    let {userId} = req.params;
    try {
        let sql = "SELECT * "
                +"FROM TBL_FEED F "
                +"INNER JOIN TBL_FEED_IMG I ON F.ID = I.FEEDID "
                +"WHERE USERID = ?";
        let [list] = await db.query(sql, [userId]);
        res.json({
            msg : "success",
            list
        });
    } catch (error) {
        console.log(error);
    }

})

router.delete("/:feedId", authMiddleware, async (req, res) =>{
    let {feedId} = req.params;
    try {
        let sql = "DELETE FROM TBL_FEED WHERE ID = ?";
        let result = await db.query(sql, [feedId]);
        res.json({
            result : "success"
        });
    } catch (error) {
        console.log(error);
    }

})

module.exports = router;