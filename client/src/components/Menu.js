import React from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, Toolbar, ListItemIcon } from '@mui/material';
import { Home, Add, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import UserProfileBox from './UserProfileBox';
import { NavLink } from "react-router-dom";

function Menu() {
  const navItemStyles = {
    "&.active .MuiListItemText-primary": {
      color: "rgba(88, 168, 139, 1)",
      fontWeight: "bold",
    },
    "& .MuiListItemText-primary": {
      color: "grey",
    },
  };
  return (
    <>
    
    <Drawer
      variant="permanent"
      sx={{
        width: 240, // 너비 설정
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240, // Drawer 내부의 너비 설정
          boxSizing: 'border-box',
          top: '120px',
          position: 'sticky', // <--- make it sticky
          height: 'calc(100vh - 180px)' // keep it within viewport
        },
      }}
    >
      <Toolbar />
      <UserProfileBox></UserProfileBox>
      <List sx={{ '& .MuiListItemText-primary': { color: 'grey' }, marginLeft : '35px' }}>
        <ListItem button component={NavLink} to="/feed" sx={navItemStyles}>
          <ListItemText primary="FEED" />
        </ListItem>
        <ListItem button component={NavLink} to="" sx={navItemStyles}>
          <ListItemText primary="MESSAGES" />
        </ListItem>
        <ListItem button component={NavLink} to="/friends" sx={navItemStyles}>
          <ListItemText primary="FRIENDS" />
        </ListItem>
        <ListItem button component={NavLink} to="/mypage" sx={navItemStyles}>
          <ListItemText primary="MY PROFILE" />
        </ListItem>
        <ListItem button component={NavLink} to="/savedposts" sx={navItemStyles}>
          <ListItemText primary="SAVED POSTS" />
        </ListItem>
      </List>
    </Drawer>
    </>
  );
};

export default Menu;