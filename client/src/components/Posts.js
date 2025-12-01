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
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';


import Comments from './Comments';
import PostInput from './PostInput';

function Posts ({children, posts: externalPosts, variant}) {

    const token = localStorage.getItem("token");
    const decoded = token ? jwtDecode(token) : null;
    
    let navigate = useNavigate();
    let [posts, setPosts] = useState([]);

    // My version

    // const handleGetFeed = React.useCallback(() => {
    //     if (!token) {
    //         alert("로그인 먼저 하세요.");
    //         navigate("/");
    //         return;
    //     }

    //     const decoded = jwtDecode(token);
    //     fetch("http://localhost:3010/feed/" + decoded.userId)
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.result === "success") {
    //                 setPosts(data.list.map(post => ({
    //                     ...post,
    //                     isLiked: post.isLikedByUser === 1,
    //                     likeCount: post.likeCount,
    //                 })));
    //             }
    //         });
    // }, [token, navigate]);
        
    // useEffect(()=>{
    //     // console.log("서버에서 요청해서 제품 목록을 가져오는 부분");
    //     handleGetFeed();
    // }, [])

    // chatGPT's version

    const fetchCommentCount = async (postId) => {
        try {
            const res = await fetch(`http://localhost:3010/comments/count/${postId}`);
            const data = await res.json();
            return data.result === "success" ? data.count : 0;
        } catch (err) {
            console.error("Error fetching comment count:", err);
            return 0;
        }
    };

    const handleGetFeed = React.useCallback(async () => {
        if (!token) {
            alert("로그인 먼저 하세요.");
            navigate("/");
            return;
        }

        const decoded = jwtDecode(token);

        try {
            const res = await fetch("http://localhost:3010/feed/" + decoded.userId);
            const data = await res.json();

            if (data.result === "success") {
                // For each post, get the comment count
                const postsWithComments = await Promise.all(
                    data.list.map(async post => {
                        const commentRes = await fetch(`http://localhost:3010/comments/${post.id}`);
                        const commentData = await commentRes.json();
                        return {
                            ...post,
                            isLiked: post.isLikedByUser === 1,
                            likeCount: post.likeCount,
                            commentCount: commentData.list.length,
                            isSaved: post.isSavedByUser === 1
                        };
                    })
                );

                setPosts(postsWithComments); // update state properly
            }
        } catch (err) {
            console.error("Error fetching feed:", err);
        }
    }, [token, navigate]);

    useEffect(() => {
        if (externalPosts) {
            setPosts(externalPosts);   // <-- use posts from parent
            return;
        }
    handleGetFeed(); 
    }, [externalPosts]);

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
                     handleGetFeed();
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

    // saved posts function 

    const toggleSave = (postId) => {
        if (!token) {
            alert("로그인 먼저 하세요.");
            navigate("/");
            return;
        }

        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        fetch("http://localhost:3010/feed/saved", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
                },
            body: JSON.stringify({ postId, userId })
        })
        .then(res => res.json())
        .then(data => {
            // Update the state for the saved icon
            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post.id === postId
                    ? { ...post, isSaved: data.saved } // data.saved = true/false
                    : post
                )
            );
        })
        .catch(err => console.error(err));
    };

    const [editingPostId, setEditingPostId] = useState(null);
    return <>

        {(externalPosts || posts).length > 0 ?
        (externalPosts || posts)
        .filter(post => {
            // For savedPosts variant, show all posts (don't filter by user)
            if (variant === "savedPosts") {
                return true;
            }
            // For other variants, apply the original logic
            return children.props.variant !== "myFeed" || post.USERID === decoded.userId;
        })
        .map((post, index) => (
            <div className="postContainer" key={index}>
                <div className="postElements">
                    {editingPostId === post.id ? (
                        // If this post is being edited, ONLY show PostInput
                        <PostInput post={post} refreshPosts={handleGetFeed} variant="editMyPost" onCancel={() => setEditingPostId(null)} />
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
                                <div className="like-btn" onClick={() => toggleLike(post.id)}>
                                    <div>
                                        {post.isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                                    </div>
                                    <div>{post.likeCount}</div>
                                </div>
                                <div className='comment-btn'>
                                    <React.Fragment>
                                        <MessageSquareText  onClick={() => handleClickOpen(post.id)} />
                                             <div>{post.commentCount}</div>
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
                                {!(variant === "myFeed" || decoded?.userId === post.USERID) && (
                                <div className='save-btn' onClick={() => toggleSave(post.id)}>
                                    {post.isSaved 
                                        ? <BookmarkIcon color="black" />  
                                        : <BookmarkBorderIcon />            
                                    }
                                </div>
                                )}
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