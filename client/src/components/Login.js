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
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/signup">
            <button>Sign up</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          {/* <form>
            <input inputRef="idRef" type="text" placeholder="Username" />
            <input inputRef="pwdRef" type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
          </form> */}
          <Box
              component="form"
              sx={{ '& > :not(style)': { m: 1, width: '30ch' } }}
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
          <form onSubmit={handleLogin}>  
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
