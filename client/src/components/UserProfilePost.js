import { Box, Avatar, Typography } from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import profileWomanImg from "../images/profileWomanImg.jpg";
import "../css/userProfileBox.css";
import "../css/comments.css";
import { useEffect, useState } from "react";
import PostInput from './PostInput';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function UserProfilePost({ variant, post, comment   }){
    const [writePost, setWritePost] = useState(false);
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    

    const navigate = useNavigate();
    let [userInfo, setUserInfo] = useState();
    console.log("user info ==>", userInfo);  

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
    }, [])

    return <>
        <Box
            sx={{
                p: 2,
                display: 'flex',           // main row: avatar + info
                alignItems: 'center',      // vertically center avatar with text
                marginBottom: '20px',
                width: '100%',
            }}
            >
            {/* Avatar on the left */}
            

            {variant == "write-comment" ? 
                <>
                <Avatar
                    src={variant == "post" ? post?.USER_IMG : userInfo?.imgPath}
                    sx={{ width: 50, height: 50, mr: 2 }} // margin-right between avatar and text
                />
                <div className="comment-input">
                    <input placeholder="write a comment & press enter"></input>
                </div>
                </>
            :
                <>
                
                <Avatar
                    src={variant == "post" ? post?.USER_IMG : userInfo?.imgPath}
                    sx={{ width: 50, height: 50, mr: 2 }} // margin-right between avatar and text
                />
                {/* Name and text stacked vertically */}
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {variant == "post" ? post?.USERNAME 
                        : variant == "comment" ? comment?.USER_ID 
                        : decoded?.userName
                        }
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'grey' }}>
                        {variant === "writePost"
                            ? "Tell us about your new finding!"
                            : variant === "post"
                            ? "@" + post?.USERID
                            : comment?.CONTENT // <-- display actual comment content
                        }
                    </Typography>
                </Box> 
                </>

            }
             {variant === "writePost" && (
                <div className="writePost-btn" onClick={() => setWritePost(!writePost)}>
                    <RestaurantIcon
                        sx={{
                            border: "1px solid #000000ff",
                            borderRadius: "50%",
                            width : "35px",
                            height : "35px"
                        }}
                    ></RestaurantIcon>
                </div>
             )}
        </Box>
        {writePost && <PostInput> </PostInput>}
        
  
    </>
}

export default UserProfilePost;