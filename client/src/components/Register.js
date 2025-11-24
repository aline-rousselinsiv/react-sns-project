import React from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Avatar,
  IconButton,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useRef } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [files, setFile] = React.useState([]);

  const handleFileChange = (event) => {
    // setFile(event.target.files[0]); // 1 file
    setFile(Array.from(event.target.files)); // multiple files
  };

  let navigate = useNavigate();
  let contentRef = useRef(null);

  function handlePost (){
    if(files.length ==0){
      alert("이미지를 선택하세요.");
      return;
    }
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    let param = {
      content : contentRef.current.value
    };
    fetch("http://localhost:3010/feed/"+decoded.userId, {
      method : "POST", 
      headers : {
          "Content-type" : "application/json"
      },
      body : JSON.stringify(param)
    })
      .then( res => res.json() )
      .then(data => {
          if(data.result){
            fnUploadFile(data.result[0].insertId);
            console.log(data);
            alert(data.msg);
            navigate("/feed");
          } else {
            alert("에러가 발생했습니다.");
          }
      })
  }

  const fnUploadFile = (feedId)=>{
    const formData = new FormData();
    for(let i=0; i<files.length; i++){
      formData.append("file", files[i]); 
    } 
    formData.append("feedId", feedId);
    fetch("http://localhost:3010/feed/upload", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      // navigate("/feedList"); // 원하는 경로
    })
    .catch(err => {
      console.error(err);
    });
  }

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start" // 상단 정렬
        minHeight="100vh"
        sx={{ padding: '20px' }} // 배경색 없음
      >
        <Typography variant="h4" gutterBottom>
          등록
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel>카테고리</InputLabel>
          <Select defaultValue="" label="카테고리">
            <MenuItem value={1}>일상</MenuItem>
            <MenuItem value={2}>여행</MenuItem>
            <MenuItem value={3}>음식</MenuItem>
          </Select>
        </FormControl>

        <TextField label="제목" variant="outlined" margin="normal" fullWidth />
        <TextField
          inputRef={contentRef}
          label="내용"
          variant="outlined"
          margin="normal"
          fullWidth
          multiline
          rows={4}
        />

        {/* <Box display="flex" alignItems="center" margin="normal" fullWidth>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            multiple
          />
          <label htmlFor="file-upload">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          {files.length > 0 && (
            {files.map((file) => (
              <Avatar
              alt="첨부된 이미지"
              src={URL.createObjectURL(file)}
              sx={{ width: 56, height: 56, marginLeft: 2 }}
            />
             ))}
            
            
          )}
          <Typography variant="body1" sx={{ marginLeft: 2 }}>
            {files.length > 0 ? files[0].name : '첨부할 파일 선택'}
          </Typography>
        </Box> */}

        <Box display="flex" alignItems="center" margin="normal" fullWidth>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            multiple
          />
          <label htmlFor="file-upload">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>

          {files.length > 0 && files.map((file) => (
            <Avatar
              key={file.name}
              alt="첨부된 이미지"
              src={URL.createObjectURL(file)}
              sx={{ width: 56, height: 56, marginLeft: 2 }}
            />
          ))}

          <Typography variant="body1" sx={{ marginLeft: 2 }}>
            {files.length > 0 ? files[0].name : '첨부할 파일 선택'}
          </Typography>
        </Box>

        <Button onClick={handlePost} variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
          등록하기
        </Button>
      </Box>
    </Container>
  );
}

export default Register;