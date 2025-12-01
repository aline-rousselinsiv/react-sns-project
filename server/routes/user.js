const express = require('express'); // framework like Spring Boot
const router = express.Router();
const db = require("../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = "server_secret_key"; // 해시 함수 실행 위해 사용할 키로 아주 긴 랜덤한 문자를 사용하길 권장하며, 노출되면 안됨.
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
    let {userId} = req.body;
    const file = req.file;
    // const filename = req.file.filename; 
    // const destination = req.file.destination; 
    try{
        const host = `${req.protocol}://${req.get("host")}`;
        const fileUrl = `${host}/uploads/${file.filename}`; // public URL for frontend

        // Update user's profile picture in DB
        const query = "UPDATE TBL_USER SET IMGPATH = ? WHERE USERID = ?";
        await db.query(query, [fileUrl, userId]);
        res.json({
            result : "success",
            newProfilePic: fileUrl
        });
    } catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
});

router.post("/join", async (req, res) =>{
    let {userId, pwd, userName, email} = req.body;
    try {
        const hashPwd = await bcrypt.hash(pwd, 10);
        console.log(hashPwd);
        let sql = "INSERT INTO TBL_USER(USERID, PWD, USERNAME, CDATETIME, UDATETIME, EMAIL) VALUES(?, ?, ?, NOW(), NOW(), ?)";
        let result = await db.query(sql, [ userId, hashPwd, userName, email ]);
        // console.log(list);
        res.json({
            msg : "success",
            result : result
        });
    } catch (error) {
        console.log(error);
    }

})

router.post('/login', async (req, res) => {
    let {userId, pwd} = req.body;
    console.log(req.body);
    try {
        let sql = "SELECT u.*, "
                +"COUNT(f.id) AS post_cnt "
                +"FROM tbl_user u "
                +"LEFT JOIN tbl_feed f ON u.userId = f.userId "
                +"WHERE U.USERID = ? "
                +"GROUP BY u.userId ";
        let [list] = await db.query(sql, [userId]);
        let msg = "";
        let result = "fail";
        let token = null ;
        if(list.length > 0){
            // 아이디 존재
            const match = await bcrypt.compare(pwd, list[0].pwd);
            if(match){
                msg= list[0].userId + "님 환영합니다!";
                result = "success";
                let user = {
                    userId : list[0].userId,
                    userName : list[0].userName,
                    email : list[0].email,
                    profilePic : list[0].imgPath,
                    intro : list[0].intro,
                    posts : list[0].post_cnt,
                    followers : list[0].follower,
                    following : list[0].following,  
                    status : "A" // hard coding status
                    // 권한 등 필요한 정보 추가 
                };

                token = jwt.sign(user, JWT_KEY, {expiresIn : '1h'});
                console.log(token);
            } else {
                msg="비밀번호를 확인해주세요.";
            }
        } else {
            // 아이디 없음
            msg="존재 아이디가 존재하지 않습니다.";
        }

        // console.log(list);
        res.json({
            msg, // msg : msg, => if the variable and the value assigned have the same name, we can omit the value (JS syntax)
            result : result,
            token : token
        });
    } catch (error) {
        console.log("에러 발생!");
        console.log(error); // Will display the actual error;
    }
})

router.get("/:userId", async (req, res) =>{
    let {userId} = req.params;
    try {
        // 1. 두개 쿼리 써서 리턴
        // let [list] = await db.query("SELECT * FROM TBL_USER WHERE USERID = ?", [userId]);
        // let [cnt] = await db.query("SELECT COUNT(*) FROM TBL_FEED WHERE USERID = ?", [userId]);
        // res.json({
        //     msg : "success",
        //     user : list[0],
        //     cnt : cnt[0]
        // });

        // 2. 조인 쿼리 만들어서 하나로 리턴
        let sql = "SELECT U.*, COUNT(f.id) AS post_cnt "
                +"FROM TBL_USER U "
                +"LEFT JOIN tbl_feed f ON u.userId = f.userId  "
                +"WHERE U.USERID = ? "
                +"GROUP BY u.userId ";
        let [list] = await db.query(sql, [userId]);
        // console.log(list);
        res.json({
            result : "success", 
            info : list[0]
        });
    } catch (error) {
        console.log(error);
    }

})

router.post("/username", async (req, res) =>{
    let {userId} = req.body;
    try {
        let sql = "SELECT * FROM TBL_USER WHERE USERID = ?";
        let [list] = await db.query(sql, [userId]);
        let msg = "";
        let result = "";
        if(list.length > 0){
            result = "existing ID";
         } else {
            result = "ID available";
         }
        res.json({
            result : result
        });
    } catch (error) {
        console.log(error);
    }

})

router.post("/email", async (req, res) =>{
    let {email} = req.body;
    try {
        let sql = "SELECT * FROM TBL_USER WHERE EMAIL = ?";
        let [list] = await db.query(sql, [email]);
        let msg = "";
        let result = "";
        if(list.length > 0){
            result = "existing email";
         } else {
            result = "email available";
         }
        res.json({
            result : result
        });
    } catch (error) {
        console.log(error);
    }

})

router.put("/", async (req, res) =>{
    let {userName, intro, userId} = req.body;
    try {
        let sql = "UPDATE TBL_USER SET USERNAME = ?, INTRO = ? WHERE USERID = ?";
        let result = await db.query(sql, [userName, intro, userId]);
        res.json({
            result : "success"
        });
    } catch (error) {
        console.log(error);
    }

})


module.exports = router;