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

router.get("/", async (req, res) =>{
    // console.log(`${req.protocol}://${req.get("host")}`);
    
    try {
        let sql = "SELECT F.*, U.USERID, U.USERNAME, U.IMGPATH " 
                    +"FROM tbl_FEED F "
                    +"INNER JOIN TBL_USER U ON F.USERID = U.USERID "
                    +"ORDER BY F.cDatetime DESC";
        let [list] = await db.query(sql);
        // console.log(list);
        res.json({
            result : "success",
            list : list
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

router.post('/:userId', async (req, res) => {
    let {userId} = req.params;
    let { content, title, address, restaurant } = req.body;
    console.log(req.body);
    try {
        let sql = "INSERT INTO TBL_FEED (USERID, CONTENT, CDATETIME, TITLE, ADDRESS, RESTAURANT) VALUES(?, ?, NOW(), ?, ?, ?)";
        let result = await db.query(sql, [userId, content, title, address, restaurant]);
        console.log("What has been posted ==>", result);
        res.json({
            msg : "추가되었습니다 !",
            result : result
        });
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;