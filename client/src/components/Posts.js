import "../css/posts.css";
import { Pen, Soup, MapPin, HandCoins } from 'lucide-react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import food1 from "../images/food1.jpeg";
import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { cloneElement } from "react";

function Posts ({children}) {

    let navigate = useNavigate();
    let [posts, setPosts] = useState([]);

    function handleGetFeed(){
        // let userId = 'test1';
        const token = localStorage.getItem("token");
    
        if(token){
          const decoded = jwtDecode(token);
          console.log("user ID ==> ", decoded.userId);
          fetch("http://localhost:3010/feed/")
                .then( res => res.json() )
                .then(data => {
                    if(data.result == "success"){
                        console.log(data);
                        setPosts(data.list);
                    }
                })
         } else {
          // 로그인 페이지 이동
          alert("로그인 먼저 하세요.");
          navigate("/");
         }
    }
        
    useEffect(()=>{
        // console.log("서버에서 요청해서 제품 목록을 가져오는 부분");
        handleGetFeed();
    }, [])

    return <>

        {posts.length > 0 ? posts.map((post, index) => (
            <div className="postContainer">
                <div className="postElements" key={index}>
                    {cloneElement(children, { post })}
                    <div className="titleSection">
                        <div ><Pen size={35} /></div>
                        <div className="title">{post.TITLE}</div>
                        <div className="tags">romantic</div>
                        <div className="tags">french</div>
                    </div>
                    <div className="locationSection">
                        <div ><Soup size={15} /></div>
                        <div className="restaurantName">{post.RESTAURANT}</div>
                        <div ><MapPin size={15} /></div>
                        <div className="restaurantAddr">{post.ADDRESS}</div>
                        <div ><HandCoins size={15} /></div>
                        <div className="restaurantPrice">Budget</div>
                    </div>
                    <div className="content">
                        {post.content}
                    </div>
                    <div style={{marginTop : "50px", marginBottom : "50px"}}>
                        <Slider className="custom-slider" dots={true} infinite={true} speed={500} slidesToShow={3} slidesToScroll={3}>
                            <img src={food1} alt="img1" />
                            <img src={food1} alt="img2" />
                            <img src={food1} alt="img3" />
                            <img src={food1} alt="img3" />
                            <img src={food1} alt="img3" />
                            <img src={food1} alt="img3" />
                        </Slider>
                    </div>
                    
                </div>
            </div>
        )) : "등록된 피드가 없습니다. 피드를 등록해보세요!"}
        
    </>
}

export default Posts;