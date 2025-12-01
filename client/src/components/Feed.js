import React, { useState } from 'react';
import {
  Grid2,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import WritePost from './WritePost';
import UserProfileBox from './UserProfileBox';  
import Posts from './Posts';
import UserProfilePost from './UserProfilePost';


function Feed({ variant, posts, keyword }) {
  return (
    <>
      {variant !== "profileFeed" && variant !== "savedPosts"? (
        <>
          <WritePost variant="write-post">
            <UserProfilePost variant="writePost" />
          </WritePost>
          <Posts keyword={keyword}>
            <UserProfilePost variant="post" />
          </Posts>
        </>
      ) : (
        <Posts posts={posts} variant={variant} keyword={keyword}>
          {variant === "savedPosts" ? (
            <UserProfilePost variant="post" />  // This will show just avatar + username
          ) : (
            <UserProfilePost variant="myFeed"/>
          )}
        </Posts>
      )}
    </>
  );
}

export default Feed;