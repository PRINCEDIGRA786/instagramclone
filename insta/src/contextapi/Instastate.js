import React, { useEffect, useState } from 'react'
import Instacontext from './Instacontext';

export default function Instastate(props) {
    const url='https://instagramclone-taupe.vercel.app/'
    const [user, setuser] = useState({ "fullname": "", "username": "" })
    const getUser = async () => {
        const response = await fetch(`${url}/auth/getuser`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setuser({ "fullname": json.fullname, "username": json.username })
        return json

    }
    const userPage = async (user) => {
        const response = await fetch(`${url}/insta/auth/userPage/${user}`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        return json

    }

    const updatePic = async (pic) => {
        const response = await fetch(`${url}/insta/update/updatepic`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                "pic": pic
            })
        });
        const json = await response.json();
        if (!json.success) {
            alert(
                "Some error occured try again"
            )
        }

    }


    const addPost = async (pic, caption) => {
        const response = await fetch(`${url}/insta/post/addpost`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                "pic": pic,
                "caption": caption
            })
        });
        const json = await response.json();
        if (!json.success) {
            alert(
                "Some error occured try again"
            )
        }
        // else {
        //     // alert("Congrates bro hanuman ji had done it for yu")
        // }

    }

    const picDetails = async (picnum, user) => {
        const response = await fetch(`${url}/insta/post/postdetails/${user}`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "picnum": picnum,
            })
        });
        const json = await response.json();
        if (json.success) {
            // console.log(json.result)
            return json.result;
        }
        else {
            alert("Something Went wrong try again later")
        }


    }

    const follow = async (username) => {
        const response = await fetch(`${url}/insta/follow/follow`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                "username": username,
            })
        });
        const json = await response.json();
        if (json.success) {
            // console.log(json.result)
            // return json.result;
            console.log("hip hip hurry followed")
        }
        else {
            alert("Something Went wrong try again later")
        }
    }

    const unfollow = async (username) => {
        const response = await fetch(`${url}/insta/follow/unfollow`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                "username": username,
            })
        });
        const json = await response.json();
        if (json.success) {
            console.log("hip hip hurry unfollowed")
        }
        else {
            alert("Something Went wrong try again later")
        }

    }
    const fetchAll = async (blueTick) => {
        const response = await fetch(`${url}/insta/auth/allusers`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                "blueTick": blueTick,
            })
        });
        const json = await response.json();
        if (json.success) {
            // console.log(json.result)
            return json.result;
        }
        else {
            // alert("Something Went wrong try again later")
            console.log("Error")
        }

    }

    // Fetch all followers and the followings of the user
    const fetchFo = async (id, followers, following) => {
        const response = await fetch(`${url}/insta/follow/fetchfo`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id": id,
                "followers": followers,
                "following": following
            })
        });
        const json = await response.json();
        if (json.result) {
            // console.log(json.result)
            return json.result;
        }
        else {
            // alert("Something Went wrong try again later")
            console.log("Error")
        }

    }

    const story = async (pic, music) => {
        const response = await fetch(`${url}/insta/update/story`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                "pic": pic,
                "music": music
            })
        });
        const json = await response.json();
        if (!json.success) {
            // console.log(json.result)
            alert("Error occureed");
        }

    }
    const editProfile = async (user) => {
        const response = await fetch(`${url}/insta/update/edit`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                "bio": user.bio,
                "fullname": user.fullname,
                "username": user.username
            })
        });
        const json = await response.json();
        if (json.success) {
            alert("Updated Successfully")
        }
        else {
            alert("Updated Unsuccessfully")
        }
    }
    const writeComment = async (content, postId) => {
        const response = await fetch(`${url}/insta/comments/posts/${postId}/comments`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                "content": content
            })
        });
        const json = await response.json();
        if (json.success) {
            alert("Updated Successfully")
        }
        else {
            alert(" Unsuccessfully")
        }
    }
    const writeReply = async (content, postId, commentId) => {
        const response = await fetch(`${url}/insta/comments/${commentId}/replies`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                "content": content,
                "postId": postId
            })
        });
        const json = await response.json();
        if (json.success) {
            alert("Added Successfully")
        }
        else {
            alert(" Unsuccessfull ha brouuuhhh")
        }
    }

    const commentLike = async (commentId) => {
        const response = await fetch(`${url}/insta/comments/${commentId}/like`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        if (!json.success) {
            alert("Added Successfully")
        }
    }
    const postLike = async (postId) => {
        const response = await fetch(`${url}/insta/post/${postId}/postlike`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        if (!json.success) {
            alert("Added Successfully")
        }
    }
    const messagedUser = async () => {
        const response = await fetch(`${url}/insta/auth/messaged`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        if (json.success) {
            // alert("Added Successfully")
            return json.result;

        }
        if (!json.success) {
            alert("Some error occured")
        }
    }
    return (
        <>
            <Instacontext.Provider value={{ messagedUser, postLike, commentLike, writeReply, writeComment, editProfile, getUser, story, unfollow, follow, fetchFo, user, updatePic, userPage, addPost, picDetails, fetchAll }}>
                {props.children}
            </Instacontext.Provider>


        </>
    )
}
