const express = require('express') // framework like Spring Boot
const cors = require('cors') 
const db = require("./db"); // we import our db into ur server and save it into the db object
const app = express()
const userRouter = require("./routes/user")
const feedRouter = require("./routes/feed")

app.use(cors({
    // origin : ["http://192.168.30.39:5501"],
    origin : "*",
    credentials : true
}))
app.use(express.json());

// router 영역
app.use("/user", userRouter);
app.use("/feed", feedRouter);


app.listen(3010, ()=>{
    console.log("server start!");
})