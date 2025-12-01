import React, { useEffect, useState } from "react";
import Feed from "./Feed";
import {jwtDecode} from "jwt-decode";
import UserProfileBox from "./UserProfileBox";



function SavedPosts ({keyword}){

    const token = localStorage.getItem("token");
    const decoded = token ? jwtDecode(token) : null;
    const [savedPosts, setSavedPosts] = useState([]);
    console.log("whats the keyword ==>", keyword);

    useEffect(() => {
        if (!token || !decoded) return;
        const url = `http://localhost:3010/feed/saved/${decoded.userId}${keyword ? `?keyword=${encodeURIComponent(keyword)}` : ''}`;

        const fetchSaved = async () => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.result === "success") {
            setSavedPosts(data.list || []);
            console.log(data.list);
            } else {
            setSavedPosts([]);
            console.error("Failed to fetch saved posts:", data);
            }
        } catch (err) {
            console.error("Error fetching saved posts:", err);
            setSavedPosts([]);
        }
        };

        fetchSaved();
    }, [token, keyword]);

    return (
    <>
    <div><Feed posts={savedPosts} variant="savedPosts">
        </Feed></div>
    </>
    )
}

export default SavedPosts;