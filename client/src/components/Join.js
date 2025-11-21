import React from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Join() {
  const navigate = useNavigate();
  let idRef = useRef();
  let pwdRef = useRef();
  let nameRef = useRef();

  function handleJoin(){
    let param = {
            userId : idRef.current.value,
            pwd : pwdRef.current.value,
            userName : nameRef.current.value
        }
    fetch("http://localhost:3010/user/join", {
            method : "POST",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify(param)
        })
        .then(res => res.json())
        .then(data => {
            alert("가입되었습니다!");
            idRef.current.value = "";
            pwdRef.current.value = "";
            nameRef.current.value = "";
            navigate("/");
        })     
  }


  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          회원가입
        </Typography>
        
        <TextField inputRef={idRef} label="ID" variant="outlined" margin="normal" fullWidth />
        <TextField
          inputRef={pwdRef}
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
        />
        <TextField inputRef={nameRef}  label="Username" variant="outlined" margin="normal" fullWidth />
        <Button onClick={handleJoin} variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
            회원가입
        </Button>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          이미 회원이라면? <Link to="/login">로그인</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Join;