import React from 'react';
import { Container, Typography, Box, Avatar, Grid, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';
import "../css/writePost.css";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Feed from './Feed';

function UserProfile() {
    const { userId } = useParams(); // Get userId from URL
    const [userInfo, setUserInfo] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const navigate = useNavigate();
    
    const token = localStorage.getItem("token");
    const decoded = token ? jwtDecode(token) : null;
    const isOwnProfile = decoded?.userId === userId; // Check if viewing own profile

    // Fetch user profile info
    useEffect(() => {
        fetch(`http://localhost:3010/user/${userId}`)
            .then(res => res.json())
            .then(data => {
                if (data.result === "success") {
                    setUserInfo(data.info);
                }
            })
            .catch(err => console.error("Failed to fetch user info:", err));
    }, [userId]);

    // Check if current user follows this profile
    useEffect(() => {
        if (decoded?.userId && userId && !isOwnProfile) {
            fetch(`http://localhost:3010/user/follow/check?follower=${decoded.userId}&following=${userId}`)
                .then(res => res.json())
                .then(data => {
                    setIsFollowing(data.isFollowing);
                })
                .catch(err => console.error(err));
        }
    }, [decoded?.userId, userId, isOwnProfile]);

    // Handle follow/unfollow
    const handleFollowToggle = () => {
        if (!token) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        fetch("http://localhost:3010/user/follow", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                followerId: decoded.userId,
                followingId: userId
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.result === "success") {
                setIsFollowing(data.isFollowing);
                // Refresh user info to update follower count
                fetch(`http://localhost:3010/user/${userId}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.result === "success") {
                            setUserInfo(data.info);
                        }
                    });
            }
        })
        .catch(err => console.error(err));
    };

    if (!userInfo) return <div>Loading...</div>;

    // If viewing own profile, redirect to MyPage
    if (isOwnProfile) {
        navigate('/mypage');
        return null;
    }

    return (
        <>
            <div className="myProfileContainer">
                <div className="profile-picture-wrapper">
                    <img 
                        src={userInfo?.imgPath}
                        alt="profile" 
                        className="profile-picture"
                    />
                </div>
                <div className="user-socials-wrapper">
                    <div className="user-socials">
                        <div className="user-socials-details">
                            <div className="bold">{userInfo?.post_cnt || 0}</div>
                            <div>posts</div>
                        </div>
                        <div className="user-socials-details">
                            <div className="bold">{userInfo?.follower || 0}</div>
                            <div>followers</div>
                        </div>
                        <div className="user-socials-details">
                            <div className="bold">{userInfo?.following || 0}</div>
                            <div>following</div>
                        </div>
                    </div>
                </div>
                
                <div className="follow-button-wrapper" style={{ textAlign: 'center', marginTop: '80px', gap: '20px', display: 'flex', justifyContent: 'center',  alignItems: 'center' }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: isFollowing ? 'grey' : 'rgba(169, 211, 195, 1)',
                            '&:hover': { 
                                backgroundColor: isFollowing ? '#666' : 'rgba(150, 190, 175, 1)' 
                            },
                            width: '150px'
                        }}
                        onClick={handleFollowToggle}
                    >
                        {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
                    </Button>
                    <Button
                        onClick={()=>{
                            alert(" 🚧 Oops ! Message function coming up very soon ! 🚧");
                        }}
                        variant="contained"
                        sx={{
                            backgroundColor: 'rgba(169, 211, 195, 1)',
                            '&:hover': { 
                                backgroundColor: 'rgba(150, 190, 175, 1)' 
                            },
                            width: '150px'
                        }}
                    >
                        MESSAGE
                    </Button>
                </div>

                <div className="user-info" style={{marginTop :'45px'}}>
                    <div className="user-info-details">
                        <div className="bold">Name</div>
                        <div>{userInfo?.userName}</div>
                    </div>
                    <div className="user-info-details">
                        <div className="bold">UserName</div>
                        <div>@{userInfo?.userId}</div>
                    </div>
                    <div className="user-info-details">
                        <div className="bold">Email</div>
                        <div>{userInfo?.email}</div>
                    </div>
                </div>
                <div className="user-introduction">
                    <div className="bold">About me</div>
                    <div>{userInfo?.intro || "No introduction yet."}</div>
                </div>
            </div>
            
            {/* Show their posts - pass userId to filter */}
            <Feed variant="userProfile" userId={userId} />
        </>
    );
}

export default UserProfile;