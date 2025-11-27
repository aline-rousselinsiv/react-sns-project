const express = require('express'); // framework like Spring Boot
const router = express.Router();
const db = require("../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = "server_secret_key"; // 해시 함수 실행 위해 사용할 키로 아주 긴 랜덤한 문자를 사용하길 권장하며, 노출되면 안됨.

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
        let sql = "SELECT * FROM TBL_USER WHERE USERID = ?";
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
        let sql = "SELECT * FROM TBL_USER WHERE USERID = ?";
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


module.exports = router;