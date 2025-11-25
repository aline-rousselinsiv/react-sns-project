import { Box, Avatar, Typography } from "@mui/material";
import profileWomanImg from "../images/profileWomanImg.jpg";
import "../css/userProfileBox.css";

function UserProfileBox({variant}){
    return <>
        <Box 
            className={variant === "writePost" ? "userProfileBox feed" : "userProfileBox"}
            sx={{ 
                p: 2, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                marginBottom : '20px'
            }}>
            <Avatar 
                src={profileWomanImg}
                sx={{ width: 70, height: 70, mb: 1 }}
            />

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Jane Doe
            </Typography>

            <Typography variant="body2" sx={{ color: 'grey' }}>
                @gourmetgirl
            </Typography>
        </Box>
  
    </>
}

export default UserProfileBox;