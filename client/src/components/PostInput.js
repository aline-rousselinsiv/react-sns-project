
import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function PostInput({variant, post, onCancel, refreshPosts}){
    let navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [input, setInput] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && input.trim() !== "") {
        const newTag = input.trim();
        if (!tags.includes(newTag)) {
            setTags([...tags, newTag]);
        }
        setInput("");
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter((t) => t !== tagToRemove));
    };

    // const [files, setFile] = useState(
    //     post?.images?.map(img => ({
    //         imgId: img.imgId,      // only for existing images
    //         name: img.imgName,     // name from DB
    //         preview: img.imgPath   // URL to show in Avatar
    //     })) || []
    // );

    const [files, setFile] = useState([]);

    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files).map(f => ({
            name: f.name,
            preview: URL.createObjectURL(f),
            file: f
        }));
        setFile([...files, ...newFiles]);
    };

    function handlePost(){
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in first.");
            return;
        }
        const decoded = jwtDecode(token);
        const { title, restaurant, address, content } = formData;
        if(title == ""){
            alert("Enter a title!");
            return;
        }
        if(restaurant == ""){
            alert("Enter the restaurant name!");
            return;
        }
        if(address== ""){
            alert("Enter the restaurant's address!");
            return;
        }
        if(content == ""){
            alert("Enter a description!");
            return;
        }
        if(files.length == 0){
            alert("Select at least one image !");
            return;
        }
        let param = {
            title : title,
            restaurant : restaurant,
            address : address,
            content : content
        };
        fetch("http://localhost:3010/feed/"+decoded.userId, {
        method : "POST", 
        headers : {
            "Content-type" : "application/json"
        },
        body : JSON.stringify(param)
        })
        .then( res => res.json() )
        .then(data => {
            if(data.result){
                console.log(data);
                alert(data.msg);
                fnUploadFile(data.result[0].insertId);
            } else {
                alert("에러가 발생했습니다.");
            }
        })
    }

    // file  upload function

    // const fnUploadFile = (feedId)=>{
    // const formData = new FormData();
    //     for(let i=0; i<files.length; i++){
    //         formData.append("file", files[i]); 
    //     } 
    //     formData.append("feedId", feedId);
    //     fetch("http://localhost:3010/feed/upload", {
    //         method: "POST",
    //         body: formData
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    //         // navigate("/feed"); // 원하는 경로
    //     })
    //     .catch(err => {
    //         console.error(err);
    //     });
    // }

    const fnUploadFile = (feedId) => {
        const formData = new FormData();
        files.forEach(f => {
            if (f.file) {  // only upload new files
                formData.append("file", f.file);
            }
        });
        formData.append("feedId", feedId);

        fetch("http://localhost:3010/feed/upload", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
    };

    // initializing formData to allow user to edit existing data

    const [formData, setFormData] = useState({
        title: "",
        restaurant: "",
        address: "",
        content: ""
    });

    useEffect(() => {
        if (variant === "editMyPost" && post) {
            setFormData({
                title: post.TITLE || "",
                restaurant: post.RESTAURANT || "",
                address: post.ADDRESS || "",
                content: post.content || ""
            });

            // NEW: load existing images
            const existingFiles = (post.images || []).map(img => {
                const id = img.ID ?? img.IMGNO ?? img.imgId ?? img.imgId ?? null;
                return {
                    imgId: id,               // normalized id for comparisons
                    name: img.imgName ?? img.IMGNAME ?? img.imgName ?? "",
                    preview: img.imgPath ?? img.imgPath ?? ""
                };
            }).filter(f => f.imgId !== null); // only keep ones with an id

            setFile(existingFiles);

            console.log("🔥 EDIT MODE POST =", post);
            console.log("🔥 IMAGES FROM SERVER =", post?.images);
        }
    }, [variant, post]);

    // cancel button function 

    const handleCancel = () => {
        if (post) {
            setFormData({
            title: post.TITLE || "",
            restaurant: post.RESTAURANT || "",
            address: post.ADDRESS || "",
            content: post.content || ""
            });
                // setTags([]); // optional, if you want to reset tags too
                // setFiles([]); // optional, reset selected images
        }
        };

    // edit post function

    function handleEditPost() {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in first.");
            return;
        }

        const decoded = jwtDecode(token);
        const { title, restaurant, address, content } = formData;

        if (title === "") { alert("Enter a title!"); return; }
        if (restaurant === "") { alert("Enter the restaurant name!"); return; }
        if (address === "") { alert("Enter the restaurant's address!"); return; }
        if (content === "") { alert("Enter a description!"); return; }

        // Determine which existing images were removed
        // Determine which existing images were removed (using normalized ids)
            const existingImages = files.filter(f => f.imgId !== undefined && f.imgId !== null);

            // build an array of ids that are currently on the server (normalize keys)
            const serverImageIds = (post.images || []).map(img => img.ID ?? img.IMGNO ?? img.imgId ?? null)
                .filter(id => id !== null);

            // now compute removed IDs: those that were on the server but are NOT in existingImages
            const removedImages = serverImageIds.filter(serverId =>
                !existingImages.some(f => f.imgId === serverId)
            );

        const param = { title, restaurant, address, content, postId: post.id, deletedImages: removedImages };

        // 1️⃣ Update post content AND delete removed images
        fetch(`http://localhost:3010/feed/${decoded.userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(param)
        })
        .then(res => res.json())
        .then(data => {
            if (data.result !== "success") throw new Error("Error updating post");

            // 2️⃣ Upload new images (files with `file` property)
            const newFiles = files.filter(f => f.file);
            if (newFiles.length > 0) {
                const formDataObj = new FormData();
                newFiles.forEach(f => formDataObj.append("file", f.file));
                formDataObj.append("feedId", post.id);

                return fetch("http://localhost:3010/feed/upload", { method: "POST", body: formDataObj })
                    .then(res => res.json());
            }
        })
        .then(() => {
            // 3️⃣ Finish
            alert("Post updated successfully!");
            refreshPosts();       // refresh parent component
            if (onCancel) onCancel(); // exit edit mode
        })
        .catch(err => {
            console.error(err);
            alert("Error updating post!");
        });
    }



    return <>
            <div style={{textAlign : "center"}}>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '110ch' }, margin : "0 auto" }}
                noValidate
                autoComplete="off" 
                >
                <TextField
                    label="Title"
                    variant="standard"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                <TextField
                    label="Restaurant"
                    variant="standard"
                    value={formData.restaurant}
                    onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                    />
                <TextField
                    label="Address"
                    variant="standard"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
                <div
                    style={{
                        borderBottom : "1px grey solid",
                        textAlign : "left",
                        // justifyContent : "center",
                        marginTop : "40px",
                        marginBottom : "10px",
                        color : "grey",
                        display: "flex",
                        flexDirection : "row",
                        gap : " 20px",
                        width: "110ch",        // ⭐ Same width as your TextFields
                        margin: "0 auto",
                        alignItems: "center"
                    }}
                >
                    <div style={{}}>Tags</div>
                    <div>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "8px",
                                // border: "1px solid #ccc",
                                padding: "8px",
                                borderRadius: "6px",
                                minHeight: "50px",
                                // marginTop: "15px",
                                width: '100ch', // match TextFields
                                margin: '0 auto', // center it
                            }}
                        >
                        {tags.map((tag, index) => (
                            <Box
                                key={index}
                                sx={{
                                    background: "#58a88b",
                                    color: "white",
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                }}
                            >
                                {tag}
                                <Box
                                sx={{ cursor: "pointer", fontWeight: "bold" }}
                                onClick={() => removeTag(tag)}
                                >
                                ×
                                </Box>
                            </Box>
                            ))}
                            <input
                                style={{ justifyContent : "center", border: "none", outline: "none", flexGrow: 1, minWidth: '100px'}}
                                type="text"
                                placeholder="Type & press Enter"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </Box>
                    </div>
                </div>
                
                <TextField
                    
                    id="standard-read-only-input"
                    defaultValue="Price"
                    variant="standard"
                    slotProps={{
                        input: {
                        readOnly: true,
                        sx : {color : "grey", marginTop : "15px"}
                        },
                    }}
                />
                <TextField
                    multiline
                    rows={4}
                    label="Description"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
                
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>   
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    multiple
                />
                <label htmlFor="file-upload">
                    <IconButton component="span">
                        <AddAPhotoIcon sx={{ color: 'black', justifyContent:"center" }} />
                    </IconButton>
                </label>
                
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {/* {files.length > 0 && files.map((file, index) => (
                        <Box key={file.name} sx={{ position: 'relative', display: 'inline-block' }}>
                        <Avatar
                            alt={file.name}
                            src={file.preview}
                            sx={{ width: 56, height: 56 }}
                        />
                        <IconButton
                            size="small"
                            sx={{
                                position: 'absolute',
                                top: -6,
                                right: -6,
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                color: 'white',
                                borderRadius: '50%',
                                width: 20,
                                height: 20,
                                padding: 0,
                                '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' },
                            }}
                            onClick={() => {
                            setFiles(files.filter((_, i) => i !== index));
                            }}
                        >
                            ×
                        </IconButton>
                        </Box>
                    ))} */}
                    {files.map((fileObj, index) => (
                        <Box key={index} sx={{ position: 'relative', display: 'inline-block' }}>
                            <Avatar
                            alt="첨부된 이미지"
                            src={fileObj.preview} // <- use preview
                            sx={{ width: 56, height: 56 }}
                            />
                            <IconButton
                            size="small"
                            sx={{
                                position: 'absolute',
                                top: -6,
                                right: -6,
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                color: 'white',
                                borderRadius: '50%',
                                width: 20,
                                height: 20,
                                padding: 0,
                                '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' },
                            }}
                            onClick={() => {
                                setFile(files.filter((_, i) => i !== index));
                            }}
                            >
                            ×
                            </IconButton>
                        </Box>
                    ))}
                </Box>

                <Stack spacing={2} direction="row">
                    {variant === "editMyPost" ? 
                    <>
                        <Button
                        onClick={handleEditPost}
                            variant="contained"
                            sx={{
                                backgroundColor: 'rgba(169, 211, 195, 1)',
                                '&:hover': { backgroundColor: 'rgba(150, 190, 175, 1)' }, // slightly darker on hover
                            }}
                            >
                            EDIT
                        </Button>
                        <Button
                            onClick={()=>{
                                if(!window.confirm("Your modifications won't be saved.")){
                                    return;
                                }
                                onCancel();
                            }}
                            variant="contained"
                            sx={{
                                backgroundColor: 'rgba(169, 211, 195, 1)',
                                '&:hover': { backgroundColor: 'rgba(150, 190, 175, 1)' }, // slightly darker on hover
                            }}
                            >
                            CANCEL
                        </Button>
                        </>
                    :
                            <Button
                            onClick={handlePost}
                            variant="contained"
                            sx={{
                                backgroundColor: 'rgba(169, 211, 195, 1)',
                                '&:hover': { backgroundColor: 'rgba(150, 190, 175, 1)' }, // slightly darker on hover
                            }}
                            >
                            POST
                        </Button>
                    }
                </Stack>
            </Box>  
        </div>
        
    </>
}

export default PostInput;