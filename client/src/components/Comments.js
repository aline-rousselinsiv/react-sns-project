import { useState } from "react";
import "../css/comments.css";
import UserProfilePost from './UserProfilePost';
import { useEffect } from "react";

function Comments(){
    let [commentsList, setCommentsList] = useState([]);
    function handleGetComments(){
        fetch("http://localhost:3010/comments/")
            .then(res => res.json())
            .then(data => {
                if(data.result == "success"){
                    setCommentsList(data.list);
                    console.log("list of comments == > ", commentsList);
                }
            })
    }
    useEffect(()=>{
            handleGetComments();
        }, [])
    return <>
        <div className="top-title">
            Comments
        </div>
        <div className="comment-content">
            {commentsList.map((comment, index) => (
            <UserProfilePost
                key={index}
                variant="comment"
                comment={comment}
                >
             </UserProfilePost>
            ))}
        </div>
    </>
}

export default Comments;