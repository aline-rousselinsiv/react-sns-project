import { useState, useEffect } from "react";
import "../css/comments.css";
import DeleteIcon from '@mui/icons-material/Delete';
import UserProfilePost from './UserProfilePost';
import { jwtDecode } from "jwt-decode";


function Comments({ onSubmitComment, postId }){
    let [commentsList, setCommentsList] = useState([]);
    console.log("Show me the freaking post ID ==>", postId);
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);

    function handleGetComments(){
        fetch("http://localhost:3010/comments/"+postId)
            .then(res => res.json())
            .then(data => {
                if(data.result == "success"){
                    setCommentsList(data.list);
                    console.log("list of comments == > ", data.list);
                }
            })
    }
    useEffect(() => {
        if(postId) handleGetComments();
    }, [postId]);

    function handleDeleteComment(commentId){
        if(!window.confirm("Are you sure you want to delete this comment?")){
            return; 
        }
        fetch("http://localhost:3010/comments/"+commentId, {
            method : "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if(data.result == "success"){
                    alert("Comment deleted!");
                    handleGetComments();
                } else { 
                    alert("error");
                }
            })
    }

    return <>
        <div className="top-title">
            Comments
        </div>
            <div className="comment-content">
                {commentsList.length > 0 ? commentsList.map((comment, index) => (
                    <div key={index} className="comment-row" style={{ display: 'flex', alignItems: 'center' }}>
                        <UserProfilePost variant="comment" comment={comment} />
                        {decoded && comment.USER_ID === decoded.userId && (
                            <div className="delete-btn" style={{ marginLeft: 'auto' }}>
                                <DeleteIcon onClick={() => handleDeleteComment(comment.COMMENT_ID)} />
                            </div>
                        )}
                    </div>
                )) : (
                    <div className="noComment">Be the first to post a comment!</div>
                )}
            </div>
        <div className="comment-input">
            <UserProfilePost 
                variant="write-comment"
                onSubmitComment={(content) => onSubmitComment(content, postId)}
            ></UserProfilePost>
        </div>
    </>
}

export default Comments;