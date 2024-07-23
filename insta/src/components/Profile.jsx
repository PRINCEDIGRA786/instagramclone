import React, { useContext, useSyncExternalStore } from 'react'
import Navbars from './Navbars'
import Instacontext from '../contextapi/Instacontext'
import { TfiSettings } from "react-icons/tfi";
import { useState } from 'react';
import { useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { BiSolidTagAlt } from "react-icons/bi";
import { MdOutlinePersonPin } from "react-icons/md";
import Follusers from './Follusers';
import axios from 'axios'
import Post from './Post';
const Profile = () => {
  const context=useContext(Instacontext)
  const[checkpost,setCheckpost]=useState(false);
  const[selectnum,setSelectnum]=useState()
  const[isSelectedfollowers,setIsselectedfollowers]=useState(false) //selected to see the followers 
  const[isSelectedfollowing,setIsselectedfollowing]=useState(false) //selected the following
  
  let {updatePic}=context
  let {getUser,editProfile}=context
  const[username,setusername]=useState();
  const[userId,setUserid]=useState();
  const[fullname,setfullname]=useState()
  const[bio,setbio]=useState()
  const[pic,setpic]=useState()
  const[arr,setArr]=useState([]);
  const[followers,setFollowers]=useState([]);
  const[following,setFollowing]=useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchUser = async () => {
    const userData = await getUser();
    setusername(userData.username);
    setfullname(userData.fullname);
    setpic(userData.pic)
    setbio(userData.bio)
    setArr(userData.posts);
    setUserid(userData._id)
    setFollowers(userData.followers)
    setFollowing(userData.following)
    if(username==""){
      fetchUser();
    }
  };
  // let arr=["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR51mgDGvrCdGIUa4KVGg5dIt8sktPnOlHC4A&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG8wDdluXeOvCOgWO1n8LOkWOIn9297RqqDg&s",
  //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG8wDdluXeOvCOgWO1n8LOkWOIn9297RqqDg&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG8wDdluXeOvCOgWO1n8LOkWOIn9297RqqDg&s"]
  useEffect(()=>{
    fetchUser();
    // console.log("username",username)

  },[])


  //Putting the image to the cloudinary................
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const[loading,setloading]=useState(false)

  const handleImageChange = (e) => {
    setloading(true);
    setImage(e.target.files[0]);
    handleUpload(e.target.files[0]);
  };

  const handleUpload = async (file) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'instagram'); // Replace with your upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dblmdnfdt/image/upload`, // Replace with your Cloud name
        formData
      );
      setUrl(response.data.secure_url);
      setpic(response.data.secure_url)
      setloading(false);
      updatePic(response.data.secure_url);
      setIsModalOpen(false)
      // alert(url)
    } catch (error) {
      console.error('Error uploading the image', error);
    }
  };
  const[isBioOpen,setBioOpen]=useState(false);
  const[edited,setEdited]=useState({"bio":bio,"username":username,"fullname":fullname});
  return (
    <>
    <Navbars/>
    <div className='bg-black  border-t-[0.6px]  absolute w-full 
    
     z-0 lg:p-20 lg:pt-8 lg:right-0 lg:top-0 lg:w-[90%] md:top-0 min-h-[100vh]
     md:right-0
      md:w-[90%] xl:w-[83%] '>
   <div className=' flex flex-col lg:flex-row lg:space-x-4
    lg:justify-end lg:mr-48'>

    <div className='flex space-x-3 justify-center py-2'>
      <h1 className='text-2xl font-thin text-white'>{username}</h1>
      <TfiSettings className='h-5 w-5 mt-2 text-white  '/>

    </div>
    <div className=' flex ml-[36%] space-x-3 py-2'>
      <div>
      <button className='text-white p-1 px-6 rounded-md text-sm bg-[#393939]' onClick={()=>setBioOpen(true)}>Edit profile</button>
      </div>
      <div>
      <button className='text-white p-1 px-6 rounded-md text-sm bg-[#393939]'>View archive</button>  </div>
    </div>
   </div>
   <div className='  justify-center space-x-7 text-white hidden lg:flex '>
      <div className='flex flex-col text-center'>
        <h3>{arr.length} posts</h3>
      </div>
      <div className='flex flex-col text-center cursor-pointer' onClick={()=>{setIsselectedfollowers(true)}}>
        <h3>{followers.length} followers</h3>
      </div>
      <div className='flex flex-col text-center cursor-pointer' onClick={()=>{setIsselectedfollowing(true)}}>
        <h3>{following.length} following</h3>
      </div>
    </div>
    {isSelectedfollowing && <Follusers id={userId} following={isSelectedfollowing} followers={isSelectedfollowers} setIsselected={setIsselectedfollowing}/>}
    {isSelectedfollowers && <Follusers id={userId} following={isSelectedfollowing} followers={isSelectedfollowers}  setIsselected={setIsselectedfollowers}/>}
    
    <div className=' flex flex-col lg:flex-row'>

    <div id="pic" className='ml-12'>
    { !pic &&
      <img src="data:image/png;base64,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" 
      alt="Loading" className='h-14 w-14 lg:h-32 lg:w-32 hover:cursor-pointer rounded-full' 
      onClick={()=>{setIsModalOpen(true)}}/>}
       
      {
        !loading && 
      <img src={pic} alt="Loading" className='h-14 w-14 lg:h-32 lg:w-32 hover:cursor-pointer rounded-full' 
      onClick={()=>{setIsModalOpen(true)}}/>
      }
      { loading &&
      <img src="https://media1.tenor.com/m/-n8JvVIqBXkAAAAC/dddd.gif" alt="Loading" className='h-14 w-14 lg:h-32 lg:w-32 hover:cursor-pointer rounded-full' 
      onClick={()=>{setIsModalOpen(true)}}/>}
    </div>
    <div className='ml-8 lg:ml-32 lg:mt-8'>
      <h1 className='text-md text-white  font-bold'>{fullname}</h1>
      <h1 className='text-sm text-white font-medium '>{bio}</h1>
    </div>
    </div>

    <div className='flex space-x-6 ml-3 my-3 lg:ml-14'>
      <div>
        <FaUserCircle className='h-14 w-14 text-white lg:h-18 lg:w-18'/>
      </div>
      <div>
        <FaUserCircle className='h-14 w-14 text-white lg:h-18 lg:w-18'/>
      </div>
      <div>
        <FaUserCircle className='h-14 w-14 text-white lg:h-18 lg:w-18'/>
      </div>
    </div>

    <div className='flex justify-around text-white border-y-[0.3px] lg:hidden'>
      <div className='flex flex-col text-center'>
        <h1>2</h1>
        <h3>posts</h3>
      </div>
      <div className='flex flex-col text-center'>
        <h1>200</h1>
        <h3>followers</h3>
      </div>
      <div className='flex flex-col text-center'>
        <h1>555</h1>
        <h3>following</h3>
      </div>
    </div>

    <div className='flex justify-around text-white border-y-[0.3px]'>
      <div className=' justify-center'>
       <HiMiniSquares2X2 className='h-8 m-2 w-8 '/>
      </div>
      <div className=' justify-center'>
       <BiSolidTagAlt className='h-8 m-2 w-8 rotate-90 '/>
      </div>
      <div className=' justify-center'>
       <MdOutlinePersonPin className='h-8 m-2 w-8 '/>
      </div>
    </div>

    {
         arr.length==0 &&<div>
                <h1 className='text-3xl my-2 font-extrabold mx-auto text-white'>No Post yet</h1>
            </div>
           } 
   { arr.length!=0 && <div className='grid grid-cols-3 gap-2 mt-2  bg-black'>
     {arr.map((element,i)=>(
      <div key={i}>
      <img src={element}  className=' h-80 w-96  hover:contrast-125  hover:brightness-100  cursor-pointer rounded-lg' onClick={()=>{
        setCheckpost(true);
        setSelectnum(i);

      }}/>
        </div>
     ))}
    {
      checkpost && <Post num={selectnum} usernameid={username} idpic={pic} setCheckpost={setCheckpost} arr={arr}/>

    }
    </div>}
    </div>
    {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center  z-50">
          <div className="bg-[#393939] w-96 py-4  rounded-xl text-center">
           { !loading && pic && <img 
              src={pic}
              alt="Circular" 
              className="rounded-full mx-auto mb-4 h-24 w-24"
            />}
             { loading && <img 
              src="https://media1.tenor.com/m/-n8JvVIqBXkAAAAC/dddd.gif"
              alt="Circular" 
              className="rounded-full mx-auto mb-4 h-24 w-24"
            />}
            {
        !loading && !pic &&
      <img src="data:image/png;base64,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"
       alt="Loading" className='rounded-full mx-auto mb-4 h-24 w-24a' 
      onClick={()=>{setIsModalOpen(true)}}/>
      }
            <div>
              <h1 className=' text-white text-xl'>Synced profile photo</h1>
              <h2 className=' text-[#7f7d7d]'>Instagram,Facebook</h2>
            </div>
            <div className="flex flex-col justify-center space-y-2 py-2">
              <h1 type='image' className=" py-2 text-blue-500 cursor-pointer hover:text-blue-600
               border-y-[0.3px]"  onClick={() => document.getElementById('imageInput').click()}>Upload Photo</h1>
               <input
        type="file"
        id="imageInput"
        className="hidden"
        onChange={handleImageChange}
      />
              <div className=" py-2  text-white border-b-[0.3px]">Manage Syn Setting</div>
          
            </div>
            <button 
              className="mt-1 text-red-500"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}*/*
          {isBioOpen && 
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center  z-50">
          <div className="   p-10 py-4 bg-[#393939] border-2 border-[#505050] rounded-xl text-center">
            <div className=' bg-[#505050] p-2 rounded-2xl text-white font-bold text-xl'>Edit profile</div>
            <div>
              <h1 className='text-white text-lg py-4 text-start font-semibold'>Bio:</h1>
              <input type='text' className='border-[0.2px] text-white hover:bg-[#505050] focus:bg-[#404040] px-4 bg-transparent border-white 
              outline-none h-20 w-80 rounded-lg  text-sm font-semibold'
              placeholder={bio}  onChange={ (e)=>setEdited({
                ...edited,
                bio: e.target.value,
              })}/>
            </div>
            <div>
              <h1 className='text-white text-lg py-4 font-semibold text-start'>Fullname:</h1>
              <input type='text' className='border-[0.2px] text-white hover:bg-[#505050] focus:bg-[#404040] bg-transparent border-white 
              outline-none h-12 px-4 w-80 rounded-lg text-start text-sm font-semibold'
              placeholder={fullname}  onChange={(e)=> setEdited({
                ...edited,
                fullname: e.target.value,
              })}/>
            </div>
            <div>
              <h1 className='text-white text-lg py-4 text-start font-semibold'>Username:</h1>
              <input type='text' className='border-[0.2px] text-white hover:bg-[#505050] focus:bg-[#404040] bg-transparent border-white 
              outline-none h-12 px-4 w-80 rounded-lg text-start text-sm font-semibold'
              placeholder={username} onChange={(e)=> setEdited({
                ...edited,
                username: e.target.value,
              })}/>
            </div>
          <div className=' space-x-8 pt-4'>
            <button 
              className="mt-1 bg-green-500 p-2 rounded-lg hover:bg-green-700 text-white"
              onClick={() => {
                editProfile(edited);

                setTimeout(() => {
                  setBioOpen(false)
                }, 1500);
                fetchUser();
                  
              }}
              >
              Save
            </button>
            <button 
              className="mt-1 bg-red-500 p-2 hover:bg-red-700 rounded-lg text-white"
              onClick={() => setBioOpen(false)}
              >
              Close
            </button>
              </div>
          </div>
        </div>
      }*/*

    </>
  )
}

export default Profile
