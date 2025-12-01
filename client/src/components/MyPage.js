import React from 'react';
import { Container, Typography, Box, Avatar, Grid, Paper } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import WritePost from './WritePost';
import "../css/writePost.css";
import IconButton from '@mui/material/IconButton';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Feed from './Feed';

function MyPage() {
    
  const [userInfo, setUserInfo] = useState(null);
  console.log("userInfo ==>", userInfo);
  const [formData, setFormData] = useState({
    userName: "",
    userId: "",
    intro: "",
    email: ""
  });
  console.log("formData ==>", formData)
  const [willEdit, setWillEdit] = useState(false);
  const [file, setFile] = React.useState([]);
  const navigate = useNavigate();

  // Fetch token and decode
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인 먼저 하세요.");
      navigate("/login");
      return;
    }

    const decoded = jwtDecode(token);
    console.log("decoded token ==>", decoded);

    // Fetch full user info from DB
    fetch(`http://localhost:3010/user/${decoded.userId}`)
      .then(res => res.json())
      .then(data => {
        // Merge decoded token info with DB info if needed
        setUserInfo({
          ...decoded,        // keep token info
          ...data.info       // overwrite with DB info
        });
      })
      .catch(err => {
        console.error("Failed to fetch user info:", err);
        setUserInfo(decoded); // fallback to token
      });
  }, [navigate]);

  // Update formData whenever userInfo changes
  useEffect(() => {
    if (userInfo) {
      setFormData({
        userName: userInfo.userName || "",
        userId: userInfo.userId || "",
        intro: userInfo.intro || "",
        email: userInfo.email || "",
        profilePic : userInfo.pathImg,
        followers : userInfo.follower
      });
    }
  }, [userInfo]);
  

  if (!userInfo) return null;

  // profile picture upload

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // single file
    if (selectedFile) {
        fnUploadFile(selectedFile);
    }
    };

    
    const fnUploadFile = (fileToUpload)=>{
        const formDataUpload = new FormData();
        formDataUpload.append("file", fileToUpload); 
        formDataUpload.append("userId", userInfo.userId);
        fetch("http://localhost:3010/user/upload", {
        method: "POST",
        body: formDataUpload
        })
        .then(res => res.json())
        .then(data => {
        if (data.result === "success") {
            console.log(data);
            setUserInfo(prev => ({ ...prev, IMGPATH: data.newProfilePic }));
            }
        })
        .catch(err => {
        console.error(err);
        });
    }

    

  return (
    <>
      {/* <WritePost variant="myProfile" userInfo={userInfo} setUserInfo={setUserInfo}>
      </WritePost> */}
      <div className="myProfileContainer">
                <div className="profile-picture-wrapper">
                    <img 
                        src={userInfo?.imgPath}
                        alt="profile" 
                        className="profile-picture"
                    />
                </div>
                <div className="user-socials-wrapper">
                    <div className="user-socials">
                        <div className="user-socials-details">
                            <div className="bold">{userInfo?.post_cnt}</div>
                            <div>posts</div>
                        </div>
                        <div className="user-socials-details">
                            <div className="bold">{userInfo?.followers}</div>
                            <div>followers</div>
                        </div >
                        <div className="user-socials-details">
                            <div className="bold">{userInfo?.following}</div>
                            <div>following</div>
                        </div>
                    </div>
                </div>
                <div className="camera-icon">
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="file-upload"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file-upload">
                        <IconButton component="span">
                            <AddAPhotoIcon sx={{ color: 'black', justifyContent:"center" }} />
                        </IconButton>
                    </label>
                </div>
                <div className="user-info">
                    <div className="user-info-details">
                        <div className="bold">Name</div>
                        {willEdit == false ?
                            <div>{userInfo?.userName}</div>
                        :
                            <div><input
                                type="text"
                                value={formData.userName}
                                onChange={(e) => setFormData({...formData, userName: e.target.value})}
                            ></input></div>
                        }
                    </div>
                    <div className="user-info-details">
                        <div className="bold">UserName</div>
                        <div>
                        {willEdit == false ?
                        <div>@{userInfo?.userId}</div>
                        :
                            <div><input
                                type="text"
                                value={formData?.userId}
                                onChange={(e) => setFormData({...formData, userId: e.target.value})}
                            ></input></div>
                        }
                        </div>
                    </div>
                    <div className="user-info-details">
                        <div className="bold">Email</div>
                        <div>
                        {willEdit == false ?
                        <div>{userInfo?.email}</div>
                        :
                            <div><input
                                type="text"
                                value={formData?.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            ></input></div>
                        }
                        </div>
                    </div>
                </div>
                <div className="user-introduction">
                    <div className="bold">About me</div>
                    <div>
                    {willEdit == false ?
                    <div>{userInfo?.intro}</div>
                    :
                        <div><textarea
                                cols={55}
                                rows={5}
                                type="text"
                                value={formData.intro}
                                onChange={(e) => setFormData({...formData, intro: e.target.value})}
                        ></textarea></div>
                    }
                    </div>
                </div>
                {willEdit == false ?
                    <div className="edit-btn">
                        <DialogActions sx={{ justifyContent: "center" }}>
                            {/* <Button onClick={() => handlePostComment(commentInput)}>Post</Button> */}
                            <Button onClick={()=> {
                                setWillEdit(true);
                            }} >EDIT</Button>
                        </DialogActions>
                    </div>
                :
                    <div className="save-btn">
                        <DialogActions sx={{ justifyContent: "center" }}>
                            {/* <Button onClick={() => handlePostComment(commentInput)}>Post</Button> */}
                            <Button onClick={()=> {
                                fetch("http://localhost:3010/user", {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(formData),
                                    })
                                    .then((res) => res.json())
                                    .then((data) => {
                                        if(data.result == "success"){
                                            console.log("Updated successfully:", data);
                                            // Refetch the updated user info from backend
                                            const token = localStorage.getItem("token");
                                            const decoded = jwtDecode(token);
                                            fetch(`http://localhost:3010/user/${formData.userId}`)
                                                .then(res => res.json())
                                                .then(data => {
                                                    setUserInfo({
                                                      ...decoded,
                                                      ...data.info
                                                    }); // update userInfo with latest DB values
                                                    alert("Profile updated!");
                                                    setWillEdit(false);
                                                });
                                        } else {
                                            alert("there's a problem..");
                                        }
                                        
                                    })
                            }} >SAVE</Button>
                        </DialogActions>
                    </div>
                }
                
      </div>
      <Feed variant="profileFeed"></Feed>
    </>
  );
}

export default MyPage;