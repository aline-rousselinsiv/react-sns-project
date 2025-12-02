import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, Avatar, Typography } from "@mui/material";
import "../css/friends.css";
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function CustomTabPanel(props) {
let navigate = useNavigate();   

const { children, value, index, sx, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ 
          p: 3, 
          display: 'flex', 
          justifyContent: 'center',  // centers horizontally
          alignItems: 'center',       // centers vertically (if you want)
          ...sx                       // spread any custom sx props
        }}>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  sx: PropTypes.object
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Friends() {
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // get followers list function

  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  let [followersList, setFollowerList] = useState();

  function handleGetFollowers(){
     if (!token) {
        alert("로그인 먼저 하세요.");
        // navigate("/");
        return;
    }

    const decoded = jwtDecode(token);
    fetch("http://localhost:3010/user/followers/"+decoded.userId)
    .then(res => res.json())
    .then(data => {
        if(data.result == "success"){
            setFollowerList(data.followers);
            console.log("And the followers are ==>", data.followers);
        } else {
            alert("error");
        }
    }) 
  }

  useEffect(()=>{
    handleGetFollowers();
  }, []);

  // get following list function

  let [followingList, setFollowingList] = useState();

  function handleGetFollowing(){
     if (!token) {
        alert("로그인 먼저 하세요.");
        // navigate("/");
        return;
    }

    const decoded = jwtDecode(token);
    fetch("http://localhost:3010/user/following/"+decoded.userId)
    .then(res => res.json())
    .then(data => {
        if(data.result == "success"){
            setFollowingList(data.following);
            console.log("I am following ==>", data.following);
        } else {
            alert("error");
        }
    }) 
  }

  useEffect(()=>{
    handleGetFollowing();
  }, []);

  return (
    <>
      <div className="main-container">
        <Box sx={{ width: '100%' }} >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered sx={{ '& .MuiTab-root': { margin: '0 50px' } }}>
              <Tab label="Following" {...a11yProps(0)} />
              <Tab label="Followers" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
        {followingList && followingList.length > 0 ? (
            followingList.map((user, index) => (
            <Box
                key={user.id || index}
                sx={{
                p: 1,
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                width: 'auto',
                }}
            >
                <Avatar
                src={user.IMGPATH}
                sx={{ width: 50, height: 50, mr: 2 }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {user.USERNAME}
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey' }}>
                    @{user.USERID}
                </Typography>
                </Box>
            </Box>
            ))
            ) : (
                <Typography>No following yet</Typography>
            )}
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
        {followersList && followersList.length > 0 ? (
            followersList.map((user, index) => (
            <Box
                key={user.id || index}
                sx={{
                p: 1,
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                width: 'auto',
                }}
            >
                <Avatar
                src={user.IMGPATH}
                sx={{ width: 50, height: 50, mr: 2 }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {user.USERNAME}
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey' }}>
                    @{user.USERID}
                </Typography>
                </Box>
            </Box>
            ))
            ) : (
                <Typography>No followers yet</Typography>
            )}
        </CustomTabPanel>
        </Box>
      </div>
    </>
  );
}

export default Friends;