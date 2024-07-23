import React, { useContext } from 'react'
import Navbars from './Navbars'
import Instacontext from '../contextapi/Instacontext'
import { TfiSettings } from "react-icons/tfi";
import { useState } from 'react';
import { useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { BiSolidTagAlt } from "react-icons/bi";
import { MdOutlinePersonPin } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { LuBadgeCheck } from "react-icons/lu";
import Post from './Post';
import Follusers from './Follusers';
const Userpage = () => {
      const params = useParams();
      const[isSelectedfollowers,setIsselectedfollowers]=useState(false) //selected to see the followers 
      const[isSelectedfollowing,setIsselectedfollowing]=useState(false) //selected the following
      const id = params.id;
  const context=useContext(Instacontext)
  const[checkpost,setCheckpost]=useState(false);
  const[selectnum,setSelectnum]=useState()

  let {userPage,getUser,follow,unfollow}=context
  const[username,setusername]=useState()
  const[userId,setUserid]=useState()
  const[fullname,setfullname]=useState()
  const[bio,setbio]=useState()
  const[pic,setpic]=useState()
  const[arr,setArr]=useState([]);
  const[bluetick,setbluetick]=useState(false);
  const[followers,setFollowers]=useState([]);
  const[following,setFollowing]=useState([]);
  const[isfollowing,setIsfollowing]=useState(false);
  const fetchUser = async () => {
    const user=await getUser();
    const userData = await userPage(id);
    setusername(userData.username);
    setfullname(userData.fullname);
    setUserid(userData._id)
    setpic(userData.pic)
    setbio(userData.bio)
    setArr(userData.posts)
    setbluetick(userData.blueTick);
    setFollowers(userData.followers)
    setFollowing(userData.following)
    let indexFollower =  userData.followers.indexOf(user._id);
        if (indexFollower > -1) {
            setIsfollowing(true)
        }
    if(username==""){
      fetchUser();
    }
  };
   useEffect(()=>{
    fetchUser();

  },[])
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
        <div className='flex space-x-2'>
      <h1 className='text-xl font-semibold text-white'>{username}</h1>
          {bluetick &&  <LuBadgeCheck className='h-5 w-5 bg-blue-700 mb-1 rounded-full'/>}
        </div>


    </div>
   <div className=' flex ml-[36%] space-x-3 py-2'>
      { !isfollowing && <div>
      <button className='text-white p-1 px-6 w-28 rounded-md text-sm bg-blue-700' onClick={()=>{
        follow(username);
        setIsfollowing(true);
        fetchUser();
      }}>Follow </button>
      </div>}
     { isfollowing && <div>
      <button className='text-white p-1 px-6 w-28 rounded-md text-sm bg-blue-700' onClick={()=>{
        unfollow(username);
        setIsfollowing(false);
        fetchUser();
      }}>Unfollow</button> 
       </div>
    }

    <div>
    <button className='text-white p-1 px-6 rounded-md text-sm bg-blue-700'>Message</button> 
    </div>
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
      
      <img src={pic} alt="Loading" className='h-14 w-14 lg:h-32 lg:w-32 rounded-full' 
      />
      
    </div>
    <div className='ml-8 lg:ml-20 lg:mt-14'>
      <h1 className='text-md text-white  font-bold'>{fullname}</h1>
      <h1 className='text-md text-white font-medium '>{bio}This is for the bio</h1>
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
        <h1>{arr.length}</h1>
        <h3>posts</h3>
      </div>
      <div className='flex flex-col text-center'>
        <h1>{followers.length}</h1>
        <h3>followers</h3>
      </div>
      <div className='flex flex-col text-center'>
        <h1>{following.length}</h1>
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
         arr.length==0 &&<div className='text-center py-4'>
                <h1 className='text-[10vh] my-2 font-extrabold mx-auto text-white'>No Post yet</h1>
            </div>
           } 

    <div className='grid grid-cols-3 gap-2 py-2 bg-black'>
     {arr.map((element,i)=>(
      <div key={i}>
      <img src={element}  className=' h-80 w-96  hover:contrast-125  hover:brightness-100  cursor-pointer rounded-lg' onClick={()=>{
        setCheckpost(true);
        setSelectnum(i);

      }}/>
        </div>
     ))}
    {
      checkpost && <Post num={selectnum} setCheckpost={setCheckpost} arr={arr} idpic={pic} usernameid={username}/>

    }
    </div>
    </div>
  

    </>
  )
}

export default Userpage
