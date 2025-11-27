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
                src={decoded?.profilePic}
                sx={{ width: 70, height: 70, mb: 1 }}
            />

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {decoded.userName}
            </Typography>

            <Typography variant="body2" sx={{ color: 'grey' }}>
                @{decoded.userId}
            </Typography>
        </Box>
  
    </>
}

export default UserProfileBox;