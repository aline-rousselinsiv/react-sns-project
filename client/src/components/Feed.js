import React, { useState } from 'react';
import {
  Grid2,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import WritePost from './WritePost';
import UserProfileBox from './UserProfileBox';  
import Posts from './Posts';
import UserProfilePost from './UserProfilePost';

// const mockFeeds = [

//   {
//     id: 1,
//     title: '게시물 1',
//     description: '이것은 게시물 1의 설명입니다.',
//     image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//   },
//   {
//     id: 2,
//     title: '게시물 2',
//     description: '이것은 게시물 2의 설명입니다.',
//     image: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664',
//   },
//   // 추가 피드 데이터
// ];

function Feed() {
  const [open, setOpen] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleClickOpen = (feed) => {
    setSelectedFeed(feed);
    setOpen(true);
    setComments([
      { id: 'user1', text: '멋진 사진이에요!' },
      { id: 'user2', text: '이 장소에 가보고 싶네요!' },
      { id: 'user3', text: '아름다운 풍경이네요!' },
    ]); // 샘플 댓글 추가
    setNewComment(''); // 댓글 입력 초기화
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFeed(null);
    setComments([]); // 모달 닫을 때 댓글 초기화
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: 'currentUser', text: newComment }]); // 댓글 작성자 아이디 추가
      setNewComment('');
    }
  };

  
  let [feeds, setFeeds] = useState([]);
  let navigate = useNavigate();

  function handleGetFeed(){
    // let userId = 'test1';
    const token = localStorage.getItem("token");

    if(token){
      const decoded = jwtDecode(token);
      console.log("user ID ==> ", decoded.userId);
      fetch("http://localhost:3010/feed/"+decoded.userId)
            .then( res => res.json() )
            .then(data => {
                console.log(data);
                setFeeds(data.list);
            })
     } else {
      // 로그인 페이지 이동
      alert("로그인 먼저 하세요.");
      navigate("/");
     }
}

  // function handleDelete(feedId){
  //   const token = localStorage.getItem("token");

  //   if(token){
  //     const decoded = jwtDecode(token);
  //     console.log("decoded token ==> ", decoded);
  //     fetch("http://localhost:3010/feed/"+feedId, {
  //       method : "DELETE"
  //     })
  //           .then( res => res.json() )
  //           .then(data => {
  //               if(data.result == "success"){
  //                 alert("삭제되었습니다 !");
  //               }
  //           })
  //    } else {
  //     // 로그인 페이지 이동
  //     alert("로그인 먼저 하세요.");
  //     navigate("/");
  //    }

  // }
    
useEffect(()=>{
    // console.log("서버에서 요청해서 제품 목록을 가져오는 부분");
    handleGetFeed();
}, [])

  return (
    <>
      <WritePost>
        <UserProfilePost variant="writePost"></UserProfilePost>
      </WritePost>
      <Posts>
        <UserProfilePost variant="post"></UserProfilePost>
      </Posts>
      <Posts>
        <UserProfilePost variant="post"></UserProfilePost>
      </Posts>
      <Posts>
        <UserProfilePost variant="post"></UserProfilePost>
      </Posts>   
      <div className="home">
        <div style={{fontSize : '100px'}}>Home</div>
        <div style={{fontSize : '100px'}}>Home</div>
        <div style={{fontSize : '100px'}}>Home</div>
        <div style={{fontSize : '100px'}}>Home</div>
        <div style={{fontSize : '100px'}}>Home</div>
        <div style={{fontSize : '100px'}}>Home</div>
        <div style={{fontSize : '100px'}}>Home</div>
        <div style={{fontSize : '100px'}}>Home</div>
      </div>
    </>
  );
}

export default Feed;