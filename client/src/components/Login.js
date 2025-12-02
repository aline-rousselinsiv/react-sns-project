import React, { useRef } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "../css/login.css";

function Login() {
  let idRef = useRef();
  let pwdRef = useRef();
  let navigate = useNavigate();

  function handleLogin(e){
    e.preventDefault();
    let param = {
            userId : idRef.current.value,
            pwd : pwdRef.current.value
        }
    fetch("http://localhost:3010/user/login", {
          method : "POST", 
          headers : {
              "Content-type" : "application/json"
          },
          body : JSON.stringify(param)
      })
          .then( res => res.json() )
          .then( data => {
              if(data.result == "success"){
                  alert(data.msg);
                  console.log(data);
                  localStorage.setItem("token", data.token); // storing our token in a local storage
                  navigate("/feed");
              } else {
                alert(data.msg);
              }
          } )    
  }  

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>FOODIE</h1>
          <p className='site-intro'>
            <div>FOODIE is a platform for all foodies that love to discover unknown or hidden restaurants, bars, cafes in their neighborhood. </div>
            <div>Whether you live in a big city or in a little peaceful village, join FOODIE and share with other users all your findings !</div>
          </p>
          <div>Don't you have an account?</div>
          <Link to="/signup">
            <button style={{fontFamily : "inherit"}}>SIGN UP</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          {/* <form>
            <input inputRef="idRef" type="text" placeholder="Username" />
            <input inputRef="pwdRef" type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
          </form> */}
          <form onSubmit={handleLogin}>  
            <Box
                component="div"
                sx={{ 
                  '& > :not(style)': { m: 1, width: '30ch' },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',  // Centers the TextFields horizontally
                  justifyContent: 'center'
                }}
                noValidate
                autoComplete="off"
              >
                <TextField inputRef={idRef} id="standard-basic" label="username" variant="standard" />
                <TextField
                inputRef={pwdRef}
                id="standard-password-input"
                label="password"
                type="password"
                autoComplete="current-password"
                variant="standard"
              />
            </Box>
            <div></div>
            <button 
              type="submit"
              style={{fontFamily : "inherit", marginTop:'5px'}}
              >LOGIN</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
