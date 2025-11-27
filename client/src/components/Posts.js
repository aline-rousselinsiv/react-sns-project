import * as React from 'react';
import "../css/posts.css";
import "../css/comments.css";
import { Pen, Soup, MapPin, HandCoins } from 'lucide-react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { MessageSquareText, Heart, BookMarked } from 'lucide-react';
import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { cloneElement } from "react";

import Comments from './Comments';

function Posts ({children}) {

    const token = localStorage.getItem("token");
    
    let navigate = useNavigate();
    let [posts, setPosts] = useState([]);

    function handleGetFeed(){
        // let userId = 'test1';
    
        if(token){
          const decoded = jwtDecode(token);
          console.log("user ID ==> ", decoded.userId);
          fetch("http://localhost:3010/feed/")
                .then( res => res.json() )
                .then(data => {
                    if(data.result == "success"){
                        console.log("Data == >", data);
                        setPosts(data.list);
                    }
                })
         } else {
          // 로그인 페이지 이동
          alert("로그인 먼저 하세요.");
          navigate("/");
         }
    }
        
    useEffect(()=>{
        // console.log("서버에서 요청해서 제품 목록을 가져오는 부분");
        handleGetFeed();
    }, [])

    // Modal for comments

    const [open, setOpen] = React.useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);

    const handleClickOpen = (postId) => {
        setOpen(true);
        setSelectedPostId(postId);  // store the ID
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handlePostComment (content, postId){
        console.log(content);

        if(token){

            const decoded = jwtDecode(token);
            let param = {
                postId: postId,
                content: content.content
            };
            if (content === "") {
                alert("Please write something.");
                return;
            }
             fetch("http://localhost:3010/comments/"+decoded.userId, {
                method : "POST", 
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify(param)
             })
            .then(res => res.json())
            .then(data => {
                if(data.result == "success"){
                    alert("댓글 추가 성공 !");
                } else {
                    alert("error");
                }
            })  

        } else {
          // 로그인 페이지 이동
          alert("로그인 먼저 하세요.");
          navigate("/");
        }
    }

    return <>

        {posts.length > 0 ? posts.map((post, index) => (
            
            <div className="postContainer">
                <div className="postElements" key={index}>
                    {console.log("Post image path:", post.images)}
                    {cloneElement(children, { post })}
                    <div className="titleSection">
                        <div ><Pen size={35} /></div>
                        <div className="title">{post.TITLE}</div>
                        <div className="tags">romantic</div>
                        <div className="tags">french</div>
                    </div>
                    <div className="locationSection">
                        <div ><Soup size={15} /></div>
                        <div className="restaurantName">{post.RESTAURANT}</div>
                        <div ><MapPin size={15} /></div>
                        <div className="restaurantAddr">{post.ADDRESS}</div>
                        <div ><HandCoins size={15} /></div>
                        <div className="restaurantPrice">Budget</div>
                    </div>
                    <div className="content">
                        {post.CONTENT}
                    </div>
                    <div style={{marginTop : "50px", marginBottom : "50px"}}>
                        <Slider className="custom-slider" dots={true} infinite={true} speed={500} slidesToShow={3} slidesToScroll={3}>
                            {/* <img src={post.imgPath} alt={post.imgName} /> */}
                            {post.images?.map(img => (
                                <img key={img.imgId} src={img.imgPath} alt={img.imgName} />
                            ))}
                        </Slider>
                    </div>
                    <div className='bottom-section'>
                        <div className='like-btn'><Heart /></div>
                        <div className='comment-btn'>
                            <React.Fragment>
                                <MessageSquareText  onClick={() => handleClickOpen(post.id)} />
                                    {console.log("Post ID passed to Comments:", post.POST_ID)}
                                 {/* <IconButton color="primary">
                                    <CommentIcon />
                                </IconButton> */}
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    BackdropProps={{
                                    sx: {
                                        background : "rgba(0,0,0,0)"
                                        },
                                    }}
                                    PaperProps={{
                                        sx: {
                                            boxShadow : '0 4px 20px rgba(0, 0, 0, 0.1)',
                                            minWidth: "1000px",
                                            minHeight: "250px",
                                            border: "2px solid rgba(190, 190, 190, 1)",  // blue border
                                            borderRadius: "16px",          // rounded corners
                                            padding: 2,
                                        },
                                    }}
                                >
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            <Comments 
                                                postId={selectedPostId} 
                                                onSubmitComment={handlePostComment}
                                            />
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        {/* <Button onClick={() => handlePostComment(commentInput)}>Post</Button> */}
                                        <Button onClick={handleClose}>Close</Button>
                                    </DialogActions>
                                </Dialog>
                            </React.Fragment>
                        </div>
                        <div className='save-btn'><BookMarked /></div>
                    </div>
                    
                </div>
            </div>
        )) : "등록된 피드가 없습니다. 피드를 등록해보세요!"}
        
            
    </>
}

export default Posts;