import React from 'react';
import { Container, Typography, Box, Avatar, Grid, Paper } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import WritePost from './WritePost';

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
    <>
      <WritePost variant="myProfile">
      </WritePost>
    </>
  );
}

export default MyPage;