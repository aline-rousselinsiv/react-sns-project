import { Box, Avatar, Typography } from "@mui/material";
import profileWomanImg from "../images/profileWomanImg.jpg";
import "../css/userProfileBox.css";

import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function UserProfileBox({variant}){

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    let decoded = jwtDecode(token);
    let [userInfo, setUserInfo] = useState();

    function handleUserInfo(){
            if(token){
                fetch("http://localhost:3010/user/" + decoded.userId)
                .then(res => res.json())
                .then(data => {
                    if(data.result == "success"){
                        setUserInfo(data.info);
                    }
                })
                } else {
                alert("로그인 후 이용해주세요.");
                navigate("/login");
                }
        }
        useEffect(()=>{
            handleUserInfo();
        }, [userInfo])

    return <>
        <Box 
            className={variant === "writePost" ? "userProfileBox feed" : "userProfileBox"}
            sx={{ 
                p: 2, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                marginBottom : '20px'
            }}>
            <Avatar 
                src={userInfo?.imgPath}
                sx={{ width: 70, height: 70, mb: 1 }}
            />

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {userInfo?.userName}
            </Typography>

            <Typography variant="body2" sx={{ color: 'grey' }}>
                @{userInfo?.userId}
            </Typography>
        </Box>
  
    </>
}

export default UserProfileBox;