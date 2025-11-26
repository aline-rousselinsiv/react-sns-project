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


function Feed() {

  return (
    <>
      <WritePost>
        <UserProfilePost variant="writePost"></UserProfilePost>
      </WritePost>
      <Posts>
        <UserProfilePost variant="post"></UserProfilePost>
      </Posts>
    </>
  );
}

export default Feed;