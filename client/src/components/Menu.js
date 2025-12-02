import React, { useEffect, useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, Toolbar, ListItemIcon } from '@mui/material';
import UserProfileBox from './UserProfileBox';
import { NavLink } from "react-router-dom";
import { Badge } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import PeopleIcon from '@mui/icons-material/People';

function Menu() {
  const [unreadCount, setUnreadCount] = useState(0);
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const navItemStyles = {
    "&.active .MuiListItemText-primary": {
      color: "rgba(88, 168, 139, 1)",
      fontWeight: "bold",
    },
    "& .MuiListItemText-primary": {
      color: "grey",
    },
  };
  useEffect(() => {
        if (decoded) {
            fetchUnreadCount();
            // Poll for new notifications every 30 seconds
            const interval = setInterval(fetchUnreadCount, 30000);
            return () => clearInterval(interval);
        }
    }, []);

    function fetchUnreadCount() {
        fetch(`http://localhost:3010/user/notifications/unread/${decoded.userId}`)
            .then(res => res.json())
            .then(data => {
                if (data.result === "success") {
                    setUnreadCount(data.unreadCount);
                }
            });
    }

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
          height: '800px' // keep it within viewport
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
          <Badge 
            badgeContent={unreadCount} 
            color="error"
            sx={{ 
              '& .MuiBadge-badge': {
                right: -10,  // Adjust position closer
                top: 5,      // Adjust vertical position
              }
            }}
          >
            <ListItemText primary="FRIENDS" />
          </Badge>
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