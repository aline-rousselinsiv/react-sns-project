import "../css/writePost.css";

function WritePost({children}){
    return <>
        <div className="writePostContainer">
            {children}
        </div>
    </>
}

export default WritePost;