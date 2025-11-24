import React from 'react';
import { Container, Typography, Box, Avatar, Grid, Paper } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function MyPage() {
  let [info, setInfo] = useState({});
  let navigate = useNavigate();
  // let userId = 'test1';

  function handleUserInfo(){
    // 원래 아이디를 jwt 토큰에서 꺼내야함
    const token = localStorage.getItem("token");
    
    if(token){
      const decoded = jwtDecode(token);
      console.log("decoded token ==> ", decoded);
      fetch("http://localhost:3010/user/"+decoded.userId)
        .then( res => res.json() )
        .then(data => {
            console.log(data.info);
            setInfo(data.info);
        })
    } else {
      // 로그인 페이지 이동
      alert("로그인 먼저 하세요.");
      navigate("/");
    }

        
    }
  
  useEffect(()=>{
      // console.log("서버에서 요청해서 제품 목록을 가져오는 부분");
      handleUserInfo();
  }, [])

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        minHeight="100vh"
        sx={{ padding: '20px' }}
      >
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '15px', width: '100%' }}>
          {/* 프로필 정보 상단 배치 */}
          <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginBottom: 3 }}>
            <Avatar
              alt="프로필 이미지"
              src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" // 프로필 이미지 경로
              sx={{ width: 100, height: 100, marginBottom: 2 }}
            />
            <Typography variant="h5">{info.userName}</Typography>
            <Typography variant="body2" color="text.secondary">
              @{info.userId}
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">팔로워</Typography>
              <Typography variant="body1">{info.follower}</Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">팔로잉</Typography>
              <Typography variant="body1">{info.following}</Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">게시물</Typography>
              <Typography variant="body1">{info.feedCount}</Typography>
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h6">내 소개</Typography>
            <Typography variant="body1">
              {info.intro}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default MyPage;