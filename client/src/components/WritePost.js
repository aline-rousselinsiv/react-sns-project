import "../css/writePost.css";
import PostInput from './PostInput';
import { cloneElement, useState } from "react";
import IconButton from '@mui/material/IconButton';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';


function WritePost({children, variant}){
    // console.log("code I passed from my component ==>", userInfo)

    return <>
         {variant === "write-post" && (
            <div className="writePostContainer">
            {children}
            </div>
          )}
    </>
}

export default WritePost;