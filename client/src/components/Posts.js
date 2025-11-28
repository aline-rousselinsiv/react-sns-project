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
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { MessageSquareText, Heart, BookMarked } from 'lucide-react';
import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { cloneElement } from "react";

import Comments from './Comments';
import PostInput from './PostInput';

function Posts ({children}) {

    const token = localStorage.getItem("token");
    const decoded = token ? jwtDecode(token) : null;
    
    let navigate = useNavigate();
    let [posts, setPosts] = useState([]);
    function handleGetFeed(){
        // let userId = 'test1';
    
        if(token){
          const decoded = jwtDecode(token);
          console.log("user ID ==> ", decoded.userId);
          fetch("http://localhost:3010/feed/"+decoded.userId)
                .then( res => res.json() )
                .then(data => {
                    if(data.result == "success"){
                        console.log("Data == >", data);
                        setPosts(data.list.map(post => ({
                            ...post,
                            isLiked: post.isLikedByUser === 1,     // from backend
                            likeCount: post.likeCount, // from backend
                        })));
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

    // let [isLiked, setIsLiked] = useState();
    // let [likeCount, setLikeCount] = useState();
    
    const toggleLike = (postId) => {
        const decoded = jwtDecode(token);
        let userId = decoded.userId;

        fetch("http://localhost:3010/feed/likes/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postId, userId })
        })
        .then(res => res.json())
        .then(data => {
            
            setPosts(prev =>
                prev.map(post => 
                    post.id === postId
                    ? {
                        ...post,
                        isLiked: data.liked,
                        likeCount: data.liked
                            ? post.likeCount + 1
                            : post.likeCount - 1
                    }
                    : post
                )
            );
        })
        .catch(err => console.error(err));
    };

    const [editingPostId, setEditingPostId] = useState(null);


    return <>

        {posts.length > 0 ?
    posts
    .filter(post => children.props.variant !== "myFeed" || post.USERID === decoded.userId)
    .map((post, index) => (
        <div className="postContainer" key={index}>
            <div className="postElements">
                {editingPostId === post.id ? (
                    // If this post is being edited, ONLY show PostInput
                    <PostInput post={post} refreshPosts={handleGetFeed} />
                ) : (
                    // Otherwise, show the normal post
                    <>
                        {cloneElement(children, { 
                            post, 
                            refreshPosts: handleGetFeed, 
                            onWillEdit: (postId, value) => setEditingPostId(value ? postId : null) 
                        })}
                        
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
                        <div className="content">{post.content}</div>
                        <div style={{marginTop : "50px", marginBottom : "50px"}}>
                            <Slider className="custom-slider" dots={true} infinite={true} speed={500} slidesToShow={3} slidesToScroll={3}>
                                {post.images?.map(img => (
                                    <img key={img.imgId} src={img.imgPath} alt={img.imgName} />
                                ))}
                            </Slider>
                        </div>
                        <div className='bottom-section'>
                            {/* Like / Comment / Save buttons */}
                        </div>
                    </>
                )}
            </div>
        </div>
    ))
: "등록된 피드가 없습니다. 피드를 등록해보세요!"}
        
            
    </>
}

export default Posts;