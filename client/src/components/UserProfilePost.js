import { Box, Avatar, Typography } from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import "../css/userProfileBox.css";
import "../css/comments.css";
import { useEffect, useRef, useState } from "react";
import PostInput from './PostInput';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { formatDistanceToNow } from 'date-fns';

function UserProfilePost({ variant, post, comment, onSubmitComment, refreshPosts, onWillEdit, isFollowing, onFollowToggle }){
    const [writePost, setWritePost] = useState(false);
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const navigate = useNavigate();
    let [userInfo, setUserInfo] = useState();
    let commentRef = useRef();
    const [localComments, setLocalComments] = useState("");
    let [willEdit, setWillEdit] = useState(false);
    console.log("show me what is it in conmments ==>", comment);
    console.log("show me what is it in post ==>", post);

    function handleUserInfo(){
        if(token){
            fetch("http://localhost:3010/user/" + decoded.userId)
            .then(res => res.json())
            .then(data => {
                if(data.result == "success"){
                    setUserInfo(data.info);
                    console.log("user infornation ==>", data.info);
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

    function handleKeyPress(e) {
    if (e.key === "Enter") {
            const content = commentRef.current.value.trim();
            if (!content) return;

            //  setLocalComments(prev => [...prev, {
            //     userName: userInfo?.userName,
            //     CONTENT: content
            // }]);
            onSubmitComment?.({ content,  postId: post?.id }); // send content + postId
            setLocalComments(content);
            console.log(content);
            commentRef.current.value = "";
        }
    }

    if (variant === "myFeed" && post?.USERID !== decoded.userId) {
        return null; // skip rendering if not the user's post
    }

    function handleDeletePost (postId){
        console.log("This is the post ID I am about to delete ==>", postId);
        if(!window.confirm("Are you sure you want to delete this post?")){
            return;
        }
         fetch("http://localhost:3010/feed/"+postId, {
                method : "DELETE"
                // headers : {
                //     "Authorization" : "Bearer " + localStorage.getItem("token")
                // }
            })
                .then(res => res.json())
                .then(data => {
                    if(data.result === "success"){
                        alert("Your post has been deleted successfully !");
                        refreshPosts();
                    }
                })
    }

    return <>
        <>
            <Box
            sx={{
                p: 2,
                display: 'flex',           // main row: avatar + info
                alignItems: 'center',      // vertically center avatar with text
                marginBottom: '20px',
                width: '100%',
                position: 'relative'
            }}
            >
            {/* Avatar on the left */}
            

            {variant == "write-comment"? 
                <>
                <Avatar
                src={variant == "post" ? post?.USER_IMG : userInfo?.imgPath}
                    sx={{ width: 50, height: 50, mr: 2 }} // margin-right between avatar and text
                />
                <div className="comment-input">
                    <input 
                        ref ={commentRef} 
                        placeholder="write a comment & press enter"
                        onKeyDown={handleKeyPress}
                    ></input>
                </div>
                </>
            :
                <>
                
                <Avatar
                    src={
                        variant === "post" ? post?.USER_IMG 
                        : variant === "comment" ? comment?.imgPath // Commenter's avatar
                        : userInfo?.imgPath  // Logged-in user (for write-comment)
                    }
                    sx={{ width: 50, height: 50, mr: 2 }} // margin-right between avatar and text
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography 
                        variant="subtitle1" 
                        sx={{ 
                            fontWeight: 'bold',
                            cursor: variant === "post" ? 'pointer' : 'default',
                            '&:hover': variant === "post" ? { textDecoration: 'underline' } : {}
                        }}
                        onClick={() => {
                            if (variant === "post" && post?.USERID) {
                                navigate(`/user/${post.USERID}`); // ✅ Navigate to user profile
                            }
                        }}>
                        {variant == "post"
                        ? post?.USERNAME
                        : variant == "comment" ? comment?.userName
                        : userInfo?.userName
                        }
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'grey' }}>
                        {variant === "writePost"
                            ? "Tell us about your new finding!"
                            : variant === "post"
                            ? "@" + post?.USERID
                            : localComments || comment?.CONTENT 
                        }
                    </Typography>
                </Box> 
                {/* Timestamp in top right corner */}
                {variant === "post" && post?.cdatetime && (
                    <Typography 
                        variant="caption" 
                        sx={{ 
                            position: 'absolute',
                            top: 20,
                            right: 16,
                            color: 'grey'
                        }}
                    >
                        {formatDistanceToNow(new Date(post.cdatetime), { addSuffix: true })}
                    </Typography>
                )}
                {variant === "post" && post?.USERID !== decoded.userId && (
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            ml: 2,  // ✅ Changed from 'auto' to 2 (small margin)
                            backgroundColor: isFollowing ? 'grey' : 'rgba(169, 211, 195, 1)',
                            '&:hover': { 
                                backgroundColor: isFollowing ? '#666' : 'rgba(150, 190, 175, 1)' 
                            },
                        }}
                        onClick={onFollowToggle}
                    >
                        {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
                    </Button>
                )}
                {variant === "myFeed" && (
                    <div className="my-profile-btn">
                        <DialogActions sx={{ justifyContent: "center" }}>
                            {/* <Button onClick={() => handlePostComment(commentInput)}>Post</Button> */}
                            <Button 
                            variant="contained"
                            sx={{
                                backgroundColor: 'rgba(169, 211, 195, 1)',
                                '&:hover': { backgroundColor: 'rgba(150, 190, 175, 1)' }, // slightly darker on hover
                            }}
                            onClick={()=>{
                                setWillEdit(true);
                                onWillEdit?.(post.id, true);
                            }}>EDIT</Button>
                        </DialogActions>
                        {!willEdit && (
                            <DialogActions sx={{ justifyContent: "center" }}>
                                {/* <Button onClick={() => handlePostComment(commentInput)}>Post</Button> */}
                                <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: 'rgba(169, 211, 195, 1)',
                                    '&:hover': { backgroundColor: 'rgba(150, 190, 175, 1)' }, // slightly darker on hover
                                }}
                                onClick={() => handleDeletePost(post.id)}>DELETE</Button>
                            </DialogActions>  
                        )}  
                    </div>
                )}
                
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
    </>
}

export default UserProfilePost;