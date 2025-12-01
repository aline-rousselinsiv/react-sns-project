import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import "../css/header.css";
import { LogOut, Search  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";


function Header ({ keyword, setKeyword }){
    // const { toggle, darkMode } = useContext(DarkModeContext);
    // const { currentUser } = useContext(AuthContext);
    let navigate = useNavigate();

    function handleLogout(){
        if(!window.confirm("Do you want to log out?")){
            return;
        }
        localStorage.removeItem("token");
        navigate("/login");
    }



    return <>
        <div className="navbar">
            <div className="leftPart">
                <Link to="/feed" style={{ textDecoration: "none" }}>
                <div>FOODIE</div>
                </Link>
            </div>
            <div className="rightPart">
                <div className="search-section">
                    <input 
                        value={keyword} 
                        onChange={(e) => {
                            setKeyword(e.target.value);
                            console.log("the keyword I entered ==>", e.target.value);
                        }}  
                        placeholder="search">
                    </input>
                    <Search
                        size={20}
                        style={{
                            position: "absolute",
                            right: "90px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "#555"
                        }}
                     />
                </div>
                <div className="logout-btn">
                    <LogOut onClick={handleLogout} />
                </div>
            </div>
        </div>
    </>
}

export default Header;