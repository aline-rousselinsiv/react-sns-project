import { Box, Avatar, Typography } from "@mui/material";
import profileWomanImg from "../images/profileWomanImg.jpg";
import "../css/userProfileBox.css";

function UserProfilePost({variant}){
    return <>
        <Box
    sx={{
        p: 2,
        display: 'flex',           // main row: avatar + info
        alignItems: 'center',      // vertically center avatar with text
        marginBottom: '20px',
        width: '100%',
    }}
    >
    {/* Avatar on the left */}
    <Avatar
        src={profileWomanImg}
        sx={{ width: 50, height: 50, mr: 2 }} // margin-right between avatar and text
    />

    {/* Name and text stacked vertically */}
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        Jane Doe
        </Typography>
        <Typography variant="body2" sx={{ color: 'grey' }}>
            {variant == "writePost" ? "Tell us about your new finding!" : "@gourmetgirl" }
        </Typography>
    </Box>
    </Box>
  
    </>
}

export default UserProfilePost;