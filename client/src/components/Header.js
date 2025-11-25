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

function Header (){
    // const { toggle, darkMode } = useContext(DarkModeContext);
    // const { currentUser } = useContext(AuthContext);
    return <>
        <div className="navbar">
            <div className="leftPart">
                <Link to="/feed" style={{ textDecoration: "none" }}>
                <span>FOODIE</span>
                </Link>
            </div>
            <div className="rightPart">
            </div>
        </div>
    </>
}

export default Header;