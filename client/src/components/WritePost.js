import "../css/writePost.css";
import PostInput from './PostInput';
import { cloneElement } from "react";

function WritePost({children}){
    return <>
        <div className="writePostContainer">
            {children}
        </div>
        
    </>
}

export default WritePost;