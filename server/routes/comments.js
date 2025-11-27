const express = require('express'); // framework like Spring Boot
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../auth");
const multer = require('multer');

router.get("/", async (req, res) =>{
    try {
        let sql = "SELECT * FROM TBL_COMMENTS";
        let [list] = await db.query(sql);
        console.log(list);
        res.json({
            result : "success", 
            list
        });
    } catch (error) {
        console.log(error);
    }

})

module.exports = router;