// import React, { useContext, useEffect, useState } from 'react';
// import { HiOutlineDotsHorizontal } from 'react-icons/hi';
// import { LuBadgeCheck } from 'react-icons/lu';
// import { CiHeart } from "react-icons/ci";
// import { FaRegComment } from "react-icons/fa";
// import { RiShareBoxFill } from "react-icons/ri";
// import { FaMountainSun } from "react-icons/fa6";
// import Instacontext from '../contextapi/Instacontext';
// import { useNavigate } from 'react-router-dom';
// import Comment from './Comment'; // Import the Comment component

// export default function Body() {
//   const navigate = useNavigate();
//   const [datadefault, setDatadefault] = useState([]);
//   const [datafollowing, setDatafollowing] = useState([]);
//   const [defaultfirst, setDefaultfirst] = useState(true);
//   const [visiblePostId, setVisiblePostId] = useState(null); // State to track the visible comments for a specific post
//   const [postDetails, setPostDetails] = useState({});
//   const context = useContext(Instacontext);
//   let { fetchAll, getUser, postLike, fetchFo, writeComment, picDetails } = context;

//   const [comment, setComment] = useState('');
//   const fn = async () => {
//     let user = await getUser();

//     if (user.following !== 0) {
//       setDefaultfirst(false);
//       let d1 = await fetchFo(user._id, false, true); // Fetch following's posts
//       setDatafollowing(d1);
//       console.log("data following is:",datafollowing)
//     }

//     let d = await fetchAll(true);
//     setDatadefault(d);
//   };

//   const fetchPostDetails = async () => {
//     const allPosts = [...datadefault, ...datafollowing];
//     const details = await Promise.all(
//       allPosts.map((element) => picDetails(0, element.username))
//     );
//     const detailsMap = {};
//     details.forEach((detail, index) => {
//       detailsMap[allPosts[index]._id] = detail;
//     });
//     setPostDetails(detailsMap);
//     console.log(postDetails)
//   };

//   useEffect(() => {
//     fetchPostDetails();
//   }, [datadefault, datafollowing]);

//   const toggleComments = (postId) => {
//     setVisiblePostId((prev) => (prev === postId ? null : postId));
//   };
//   const[postId,setPostId]=useState();
//   const userId = localStorage.getItem('auth-token'); // Assuming the auth token contains the user ID directly
  
//   useEffect(() => {
//     fn();
//   }, []);

//   return (
//     <>
//       {!datadefault.length && (
//         <img src="https://media1.tenor.com/m/-n8JvVIqBXkAAAAC/dddd.gif" alt="Loading" className='bg-black flex flex-col text-white pl-[20%] mt-0 absolute lg:top-[19%] md:top-[16%] sm:top-[24%] ml-8 top-[22%] md:py-8 lg:py-0 justify-center text-center' />
//       )}

//       {datadefault.length && (
//         <div className='bg-black flex flex-col text-white mt-0 absolute lg:top-[19%] md:top-[16%] xl:left-52 sm:top-[24%] top-[22%] md:py-8 lg:py-0 w-[750px] border- border-purple-600 justify-center text-center'>
//           {defaultfirst && (
//             <h1 className='text-white mx-auto my-4 text-3xl font-jaro'>Recommended for you</h1>
//           )}

//           {datafollowing.map((element, i) => (
//             <div className='mx-auto mt-5 mb-7' key={i}>
//               <div className='flex space-x-4 justify-between'>
//                 <div className='flex space-x-3 cursor-pointer py-4' onClick={() => { navigate(`/instagram.com/${element.username}`) }}>
//                   <div>
//                     <img src={element.pic} alt="Loading" className='h-10 w-10 rounded-full' />
//                   </div>
//                   <h1 className='text-semibold text-sm mt-2'>{element.username}</h1>
//                   {element.blueTick && <LuBadgeCheck className='h-4 w-4 bg-blue-700 rounded-full mt-2' />}
//                 </div>
//                 <div>
//                   <HiOutlineDotsHorizontal className='text-white h-7 w-7 mt-4 mr-5' />
//                 </div>
//               </div>

//               <div className='justify-center text-center mx-auto'>
//                 <img src={element.posts[0]} className='border-[0.4px] rounded-md mx-auto border-[#393939] /border-[#383838] min-h-96 min-w-96 max-w-[30vw]' />
//               </div>

//               <div className='flex justify-between'>
//                 <div className='flex py-4 space-x-4'>
//                   <CiHeart className={`h-8 w-8  cursor-pointer ${postDetails[element._id]?.likes.includes(userId) ? 'text-red-500' : 'text-white'}`} onClick={async () => {
//                     let d = await picDetails(0, element.username);
//                     setPostDetails((prev) => ({ ...prev, [d._id]: d }));
//                     postLike(d._id);
//                     fetchPostDetails();
//                   }} />
//                   <FaRegComment className='h-7 w-6 text-white' />
//                   <RiShareBoxFill className='h-7 w-6 text-white' />
//                 </div>
//                 <div className='py-4'>
//                   <FaMountainSun className='h-7 w-6 text-white' />
//                 </div>
//               </div>

//               <div className='text-start py-1'>
//                 <h1 className='text-md font-semibold text-white'>{postDetails[element._id]?.likes.length || 0} likes</h1>
//               </div>
//               <div className='flex space-x-2 py-1'>
//                 <h1 className='text-md text-white font-semibold'>{element.username}</h1>
//                 <h1 className='text-md text-white font-medium'>{postDetails[element._id]?.caption}</h1>
//               </div>
//               <div className='text-start'>
//                 <h1 className='text-[#7d7a7a] cursor-pointer' onClick={async () => {
//                   let p = await picDetails(0, element.username);
//                   setPostId(p._id);
//                   toggleComments(postId);
//                 }}>
//                   View all comments
//                 </h1>
//                 {visiblePostId===postId && <Comment postId={postId} />} {/* Show comments if toggled */}
//                  <div className='flex space-x-4'>
//                   <input type='text' placeholder='Add a comment ........' className='pb-2 mt-1 focus:outline-none placeholder:text-[#7d7b7b] bg-transparent border-b-2 border-[#4e4c4c] text-sm min-w-80' onChange={(e) => {
//                     setComment(e.target.value);
//                   }} />
//                   <button className=' p-1 rounded-lg text-sm px-2 font-extrabold text-blue-300 hover:text-blue-500 ' onClick={async () => {
//                     let p = await picDetails(0, element.username);
//                     writeComment(comment, p._id);
//                     setComment("");
//                     window.location.reload();
//                   }}>Post</button>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {!defaultfirst && (
//             <h1 className='text-white mx-auto my-4 mt-5 text-3xl font-jaro'>Recommended for you</h1>
//           )}

//           {datadefault.map((element, i) => (
//             <div className='mx-auto mt-5 mb-7' key={i}>
//               <div className='flex space-x-4 justify-between'>
//                 <div className='flex space-x-3 cursor-pointer py-4' onClick={() => { navigate(`/instagram.com/${element.username}`) }}>
//                   <div>
//                     <img src={element.pic} alt="Loading" className='h-10 w-10 rounded-full' />
//                   </div>
//                   <h1 className='text-semibold text-sm mt-2'>{element.username}</h1>
//                   {element.blueTick && <LuBadgeCheck className='h-4 w-4 bg-blue-700 rounded-full mt-2' />}
//                 </div>
//                 <div>
//                   <HiOutlineDotsHorizontal className='text-white h-7 w-7 mt-4 mr-5' />
//                 </div>
//               </div>

//               <div className='justify-center'>
//                 <img src={element.posts[0]} className='border-[0.4px] mx-auto border-[#393939] rounded-md /border-[#383838] min-h-96 min-w-96 max-w-[30vw]' />
//               </div>

//               <div className='flex justify-between'>
//                 <div className='flex py-4 space-x-4'>
//                   <CiHeart className={`h-8 w-8 text-white cursor-pointer ${postDetails[element._id]?.likes.includes(userId) ? 'text-red-500' : ''}`} onClick={async () => {
//                     let d = await picDetails(0, element.username);
//                     setPostDetails((prev) => ({ ...prev, [d._id]: d }));
//                     postLike(d._id);
//                     fetchPostDetails();
//                   }} />
//                   <FaRegComment className='h-7 w-6 text-white' />
//                   <RiShareBoxFill className='h-7 w-6 text-white' />
//                 </div>
//                 <div className='py-4'>
//                   <FaMountainSun className='h-7 w-6 text-white' />
//                 </div>
//               </div>

//               <div className='text-start py-1'>
//                 <h1 className='text-md font-semibold text-white'>{postDetails[element._id]?.likes.length } likes</h1>
//               </div>
//               <div className='flex py-1 space-x-2'>
//                 <h1 className='text-md text-white font-semibold'>{element.username}</h1>
//                 <h1 className='text-md text-white font-medium'>{postDetails[element._id]?.caption}</h1>
//               </div>
//               <div className='text-start'>
//                 <h1 className='text-[#7d7a7a] cursor-pointer' onClick={async () => {
//                   let p = await picDetails(0, element.username);
//                   setPostId(p._id);
//                   toggleComments(postId);
//                 }}>
//                   View all comments
//                 </h1>
//                 {visiblePostId==postId && <Comment postId={postId} />} {/* Show comments if toggled */}
//                  <div className='flex space-x-4'>
//                   <input type='text' placeholder='Add a comment ........' className='pb-2 mt-1 focus:outline-none placeholder:text-[#7d7b7b] bg-transparent border-b-2 border-[#4e4c4c] text-sm w-80' onChange={(e) => {
//                     setComment(e.target.value);
//                   }} />
//                   <button className='text-blue-300 hover:text-blue-500  p-1 rounded-lg text-sm px-2 font-extrabold bg--500 hover:bg--600' onClick={async () => {
//                     let p = await picDetails(0, element.username);
//                     writeComment(comment, p._id);
//                     window.location.reload();
//                   }}>Post</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }

import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { LuBadgeCheck } from 'react-icons/lu';
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { RiShareBoxFill } from "react-icons/ri";
import { FaMountainSun } from "react-icons/fa6";
import Instacontext from '../contextapi/Instacontext';
import { useNavigate } from 'react-router-dom';
import Comment from './Comment'; // Import the Comment component
import { FaHeart } from "react-icons/fa6";

export default function Body() {
  const navigate = useNavigate();
  const [datadefault, setDatadefault] = useState([]);
  const [datafollowing, setDatafollowing] = useState([]);
  const [defaultfirst, setDefaultfirst] = useState(true);
  const [visibleComments, setVisibleComments] = useState({}); // State to track visible comments
  const [postDetails, setPostDetails] = useState({});
  const context = useContext(Instacontext);
  const[userId,setUserId]=useState();
  let { fetchAll, getUser, postLike, fetchFo, writeComment, picDetails } = context;

  const [comment, setComment] = useState('');
  const fn = async () => {
    let user = await getUser();
    setUserId(user._id)

    if (user.following !== 0) {
      setDefaultfirst(false);
      let d1 = await fetchFo(user._id, false, true); // Fetch following's posts
      setDatafollowing(d1);
    }

    let d = await fetchAll(true);
    setDatadefault(d);
  };

  const fetchPostDetails = async () => {
    const allPosts = [...datadefault, ...datafollowing];
    const details = await Promise.all(
      allPosts.map((element) => picDetails(0, element.username))
    );
    const detailsMap = {};
    details.forEach((detail, index) => {
      detailsMap[allPosts[index]._id] = detail;
    });
    setPostDetails(detailsMap);
  };
  const postDisklike = async (postId) => {
    try {
      const response = await fetch(`https://instagramclone-mrervlcqj-princedigra786s-projects.vercel.app/insta/post/${postId}/unlike`, {
        method: 'DELETE', // Specifying the method type
        headers: {
          'Content-Type': 'application/json', // Ensure the content type is specified
          'auth-token': localStorage.getItem('token') // Correctly including the auth token in the headers
        }
      });
  
      const data = await response.json();
  
      if (data.success) {
        fetchPostDetails(); // Refresh comments if the request is successful
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  

  useEffect(() => {
    fetchPostDetails();
  }, [datadefault, datafollowing]);

  const toggleComments = (postId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // const userId = localStorage.getItem('auth-token'); // Assuming the auth token contains the user ID directly
  
    useEffect(() => {
    fn();
  }, []);

  return (
    <>
      {(!datadefault || !datafollowing) && (
        <img src="https://media1.tenor.com/m/-n8JvVIqBXkAAAAC/dddd.gif" alt="Loading" className='bg-black flex flex-col text-white pl-[20%] mt-0 absolute lg:top-[19%] md:top-[16%] sm:top-[24%] ml-8 top-[22%] md:py-8 lg:py-0 justify-center text-center' />
      )}

    
        <div className='bg-black flex flex-col text-white mt-0 absolute lg:top-[19%] md:top-[16%] xl:left-52 sm:top-[24%] top-[22%] md:py-8 lg:py-0 w-[750px] border- border-purple-600 justify-center text-center'>
          {datafollowing.length==0 && (
            <h1 className='text-white mx-auto my-4 text-3xl font-jaro'>Recommended for you</h1>
          )}

          { datafollowing.length && datafollowing.map((element, i) => (
       element.posts[0] &&     <div className='mx-auto mt-5 mb-7' key={i}>
              <div className='flex space-x-4 justify-between'>
                <div className='flex space-x-3 cursor-pointer py-4' onClick={() => { navigate(`/instagram.com/${element.username}`) }}>
                  <div>
                    <img src={element.pic} alt="Loading" className='h-10 w-10 rounded-full' />
                  </div>
                  <h1 className=' text-sm mt-2 hover:text-violet-100 hover:font-semibold'>{element.username}</h1>
                  {element.blueTick && <LuBadgeCheck className='h-4 w-4 bg-blue-700 rounded-full mt-2' />}
                </div>
                <div>
                  <HiOutlineDotsHorizontal className='text-white h-7 w-7 mt-4 mr-5' />
                </div>
              </div>

              <div className='justify-center text-center mx-auto'>
                <img src={element.posts[0] } className='border-[0.4px] rounded-md mx-auto border-[#393939] /border-[#383838] min-h-96 min-w-96 max-w-[30vw]' />
              </div>

              <div className='flex justify-between'>
                <div className='flex py-4 space-x-4'>
                  {
                    (!postDetails[element._id]?.likes.includes(userId))?
                <CiHeart 
                className={`h-8 w-8 p-0 m-0 cursor-pointer  `} 
  onClick={async () => {
    let d = await picDetails(0, element.username);
    setPostDetails((prev) => ({ ...prev, [d._id]: d }));
    postLike(d._id);
    fetchPostDetails();
  }} 
/>
: <FaHeart
  className={`h-7 w-7 cursor-pointer text-red-600  `} 
  onClick={async () => {
    let d = await picDetails(0, element.username);
    setPostDetails((prev) => ({ ...prev, [d._id]: d }));
    // postLike(d._id);
    postDisklike(postDetails[element._id]._id);
    fetchPostDetails();
  }} 
/>
}
 

                  <FaRegComment className='h-7 w-6 text-white' />
                  <RiShareBoxFill className='h-7 w-6 text-white' />
                </div>
                <div className='py-4'>
                  <FaMountainSun className='h-7 w-6 text-white' />
                </div>
              </div>

              <div className='text-start py-1'>
                <h1 className='text-md font-semibold text-white'>{postDetails[element._id]?.likes.length || 0} likes</h1>
              </div>
              <div className='flex space-x-2 py-1'>
                <h1 className='text-md text-white font-semibold'>{element.username}</h1>
                <h1 className='text-md text-white font-medium'>{postDetails[element._id]?.caption}</h1>
              </div>
              <div className='text-start'>
                <h1 className='text-[#7d7a7a] cursor-pointer hover:text-[#d6cdcd]' onClick={() => {
                  toggleComments(element._id);
                }}>
                  View all comments
                </h1>
                {visibleComments[element._id] && <Comment postId={postDetails[element._id]._id} />} {/* Show comments if toggled */}
                <div className='flex space-x-4'>
                  <input type='text' placeholder='Add a comment ........' className='pb-2 mt-1 focus:outline-none placeholder:text-[#7d7b7b] bg-transparent border-b-2 border-[#4e4c4c] text-sm min-w-80' onChange={(e) => {
                    setComment(e.target.value);
                  }} />
                  <button className=' p-1 rounded-lg text-sm px-2 font-extrabold text-blue-300 hover:text-blue-500 ' onClick={async () => {
                    let p = await picDetails(0, element.username);
                    writeComment(comment, p._id);
                    setComment("");
                    window.location.reload();
                  }}>Post</button>
                </div>
              </div>
            </div>
          ))}

          {datadefault.length!=0 && (
            <h1 className='text-white mx-auto my-4 mt-5 text-3xl font-jaro'>Recommended for you</h1>
          )}

          { datadefault && datadefault.map((element, i) => (
            <div className='mx-auto mt-5 mb-7' key={i}>
              <div className='flex space-x-4 justify-between'>
                <div className='flex space-x-3 cursor-pointer py-4' onClick={() => { navigate(`/instagram.com/${element.username}`) }}>
                  <div>
                    <img src={element.pic} alt="Loading" className='h-10 w-10 rounded-full' />
                  </div>
                  <h1 className='text-semibold text-sm mt-2 hover:text-violet-100 hover:font-semibold'>{element.username}</h1>
                  {element.blueTick && <LuBadgeCheck className='h-4 w-4 bg-blue-700 rounded-full mt-2' />}
                </div>
                <div>
                  <HiOutlineDotsHorizontal className='text-white h-7 w-7 mt-4 mr-5' />
                </div>
              </div>

              <div className='justify-center'>
                <img src={element.posts[0]} className='border-[0.4px] mx-auto border-[#393939] rounded-md /border-[#383838] min-h-96 min-w-96 max-w-[30vw]' />
              </div>

              <div className='flex justify-between'>
                <div className='flex py-4 space-x-4'>
                {
                    (!postDetails[element._id]?.likes.includes(userId))?
                <CiHeart 
                className={`h-8 w-8 p-0 m-0 cursor-pointer  `} 
  onClick={async () => {
    let d = await picDetails(0, element.username);
    setPostDetails((prev) => ({ ...prev, [d._id]: d }));
    postLike(d._id);
    fetchPostDetails();
  }} 
/>
: <FaHeart
  className={`h-7 w-7 cursor-pointer text-red-600  `} 
  onClick={async () => {
    let d = await picDetails(0, element.username);
    setPostDetails((prev) => ({ ...prev, [d._id]: d }));
    // postLike(d._id);
    postDisklike(postDetails[element._id]._id);
    fetchPostDetails();
  }} 
/>
}
                  <FaRegComment className='h-7 w-6 text-white' />
                  <RiShareBoxFill className='h-7 w-6 text-white' />
                </div>
                <div className='py-4'>
                  <FaMountainSun className='h-7 w-6 text-white' />
                </div>
              </div>

              <div className='text-start py-1'>
                <h1 className='text-md font-semibold text-white'>{postDetails[element._id]?.likes.length } likes</h1>
              </div>
              <div className='flex py-1 space-x-2'>
                <h1 className='text-md text-white font-semibold'>{element.username}</h1>
                <h1 className='text-md text-white font-medium'>{postDetails[element._id]?.caption}</h1>
              </div>
              <div className='text-start'>
                <h1 className='text-[#7d7a7a] cursor-pointer hover:text-[#d6cdcd]' onClick={() => {
                  toggleComments(element._id);
                }}>
                  View all comments
                </h1>
                {visibleComments[element._id]&& <Comment postId={postDetails[element._id]._id } />} {/* Show comments if toggled */}
                <div className='flex space-x-4'>
                  <input type='text' placeholder='Add a comment ........' className='pb-2 mt-1 focus:outline-none placeholder:text-[#7d7b7b] bg-transparent border-b-2 border-[#4e4c4c] text-sm w-80' onChange={(e) => {
                    setComment(e.target.value);
                  }} />
                  <button className='text-blue-300 hover:text-blue-500  p-1 rounded-lg text-sm px-2 font-extrabold bg--500 hover:bg--600' onClick={async () => {
                    let p = await picDetails(0, element.username);
                    writeComment(comment, p._id);
                    window.location.reload();
                  }}>Post</button>
                </div>
              </div>
            </div>
          ))}
        </div>
    
    </>
  );
}

