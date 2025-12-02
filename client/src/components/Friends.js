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
          flexWrap: 'wrap',           // This allows wrapping
          justifyContent: 'center',   // centers the items
          gap: 2,                     // spacing between items
          ...sx
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
    let navigate = useNavigate();   
  const [value, setValue] = React.useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
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

   // Filter functions
  const filteredFollowing = followingList?.filter(user =>
    user.USERNAME.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.USERID.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const filteredFollowers = followersList?.filter(user =>
    user.USERNAME.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.USERID.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

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
          <div className='search-bar'>
            <input 
                placeholder='Search name'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            ></input>
            </div>
          <CustomTabPanel value={value} index={0}>
        {filteredFollowing && filteredFollowing.length > 0 ? (
            filteredFollowing.map((user, index) => (
            <Box
                key={user.id || index}
                sx={{
                p: 1,
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                width: '250px',
                cursor: 'pointer',
                '&:hover': {        // Optional: add hover effect
                backgroundColor: '#f5f5f5'
                }}}
                onClick={()=>{
                    console.log("Clicked user:", user);
                    navigate("/user/"+user.USERID);
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
                <Typography>
                    {searchQuery ? 'No matching users found' : 'No following yet'}
                </Typography>
            )}
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
        {filteredFollowers && filteredFollowers.length > 0 ? (
            filteredFollowers.map((user, index) => (
            <Box
                key={user.id || index}
                sx={{
                p: 1,
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                width: '250px',
                cursor: 'pointer',
                '&:hover': {        // Optional: add hover effect
                backgroundColor: '#f5f5f5'
                }}}
                onClick={()=>{
                    console.log("Clicked user:", user);
                    navigate("/user/"+user.USERID);
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
                <Typography>
                    {searchQuery ? 'No matching users found' : 'No followers yet'}
                </Typography>
            )}
        </CustomTabPanel>
        </Box>
      </div>
    </>
  );
}

export default Friends;