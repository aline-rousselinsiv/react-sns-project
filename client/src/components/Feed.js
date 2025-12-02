
import WritePost from './WritePost';
import Posts from './Posts';
import UserProfilePost from './UserProfilePost';


function Feed({ variant, posts, keyword, userId }) {
  return (
    <>
      {variant !== "profileFeed" && variant !== "savedPosts" && variant !=="userProfile" ? (
        <>
          <WritePost variant="write-post">
            <UserProfilePost variant="writePost" />
          </WritePost>
          <Posts keyword={keyword}>
            <UserProfilePost variant="post" />
          </Posts>
        </>
      ) : (
        <Posts posts={posts} variant={variant} keyword={keyword} userId={userId}>
          {variant === "savedPosts" || variant === "userProfile" ?(
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