import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/signup.css";

function Signup() {
  const navigate = useNavigate();
  let idRef = useRef();
  let pwdRef = useRef();
  let pwdRef2 = useRef();
  let nameRef = useRef();
  let emailRef = useRef();

  
  // function to check for username duplicates

  const [username, setUsername] = useState("");
  const [availableId, setAvailableId] = useState(null);

  function handleUsername () {
    let param = {
      userId : idRef.current.value
    }
    fetch("http://localhost:3010/user/username", {
            method : "POST",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify(param)
        })
        .then(res => res.json())
        .then(data => {
          if (data.result === "existing ID") {
            setAvailableId(false);
          } else {
            setAvailableId(true);
          }
        })
  }

  useEffect(() => {
    if (!username) {
      setAvailableId(null);
      return;
    }

    const timer = setTimeout(() => {
      handleUsername(username);
    }, 500);

    return () => clearTimeout(timer);
  }, [username]);

  // function to check if teh pwd matches the security requirements

  const [passwordValid, setPasswordValid] = useState(null);

  function handlePasswordRegex (){
    let pwd = pwdRef.current.value;
    let hasLetter = /[A-Za-z]/.test(pwd);
    let hasNumber = /[0-9]/.test(pwd);
    let hasSpecial = /[^A-Za-z0-9]/.test(pwd);
    let hasMinLength = pwd.length >= 6;

    if (hasLetter && hasNumber && hasSpecial && hasMinLength) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }

  }

  // function to check for email duplicates 

  const [email, setEmail] = useState("");
  const [existingEmail, setExistingEmail] = useState(null);

  function handleEmailCheck(){
    let param = {
      email : emailRef.current.value
    }
    fetch("http://localhost:3010/user/email", {
            method : "POST",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify(param)
        })
        .then(res => res.json())
        .then(data => {
          if (data.result === "existing email") {
            setExistingEmail(false);
          } else {
            setExistingEmail(true);
          }
        })
  }

  useEffect(() => {
    if (!email) {
      setExistingEmail(null);
      return;
    }

    const timer = setTimeout(() => {
      handleEmailCheck(email);
    }, 500);

    return () => clearTimeout(timer);
  }, [email]);

  // function to confirm the passwords match

  const [passwordsMatch, setPasswordsMatch] = useState(null);

  function handleConfirmPassword() {
    let pwd = pwdRef.current.value;
    let pwd2 = pwdRef2.current.value;

    if (!pwd2) {
      setPasswordsMatch(null); // nothing typed yet
      return;
    }

    if (pwd === pwd2) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }

  // sign up function

  function handleJoin(e){
    e.preventDefault();

    let email = emailRef.current.value;
    let name = nameRef.current.value;
    let id = idRef.current.value;
    let pwd1 = pwdRef.current.value;
    let pwd2 = pwdRef2.current.value;

    if(id == ""){
      alert("Enter your username.");
      return;
    }

    if(name == ""){
      alert("Enter your name.");
      return;
    }

    if(email == ""){
      alert("Enter your email.");
      return;
    }

    if(pwd1 == ""){
      alert("Enter your password.");
      return;
    }

    if(pwd2 == ""){
      alert("Confirm your password.");
      return;
    }

    if(!email.includes("@") || !email.includes(".")){
      alert("Invalid email.");
      return;
    }

    let param = {
            userId : idRef.current.value,
            pwd : pwdRef.current.value,
            userName : nameRef.current.value,
            email :  emailRef.current.value
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
            navigate("/login");
        })     
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>FOODIE</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Sign up</h1>
          <form onSubmit={handleJoin}>
            <Box sx={{ '& > :not(style)': { m: 0 } }}>
              <TextField inputRef={idRef} id="standard-basic" label="username" variant="standard" margin="dense" onChange={(e) => setUsername(e.target.value)}/>
                {availableId === true && (
                  <p style={{ color: "green", fontSize:"12px"}}>
                    Username available.
                  </p>
                )}
                {availableId === false && (
                  <p style={{ color: "red", fontSize:"12px"}}>
                    This username is already used.
                  </p>
                )}
              <TextField inputRef={nameRef} id="standard-basic" label="name" variant="standard"margin="dense"/>
              <TextField inputRef={emailRef} id="standard-basic" label="email" variant="standard" onChange={(e) => setEmail(e.target.value)}/>
                {existingEmail === true && (
                  <p style={{ color: "green", fontSize:"12px"}}>
                    Valid email.
                  </p>
                )}
                {existingEmail === false && (
                  <p style={{ color: "red", fontSize:"12px"}}>
                    This email is already used.
                  </p>
                )}
              <TextField
                inputRef={pwdRef}
                id="standard-password-input"
                label="password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                onChange={handlePasswordRegex}
              />
              {passwordValid === false && (
              <p style={{ color: "red", fontSize:"10px" }}>
                Password must be at least 6 characters long and contain 1 letter, 1 number, and 1 special character.
              </p>
              )}

              {passwordValid === true && (
                <p style={{ color: "green", fontSize:"12px" }}>
                  Password meets all requirements.
                </p>
              )}
              <TextField
                inputRef={pwdRef2}
                id="standard-password-input"
                label="confirm password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                onChange={handleConfirmPassword}
              />
              {passwordsMatch === false && (
                <p style={{ color: "red", fontSize:"12px" }}>
                Passwords do not match.
                </p>
              )}

              {passwordsMatch === true && (
                <p style={{ color: "green", fontSize:"12px" }}>
                Passwords match.
                </p>
              )}
            </Box>
            <button type="submit">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;