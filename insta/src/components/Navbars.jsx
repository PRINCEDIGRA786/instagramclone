import React, { useContext, useEffect } from 'react'
import { CiHeart } from "react-icons/ci";
import { FaSearch, FaUser } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { IoPeopleSharp } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { FaRegStar } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { MdHome  } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { BiSolidMoviePlay } from "react-icons/bi";
import { PiMessengerLogoBold } from "react-icons/pi";
import { MdOutlineAddBox } from "react-icons/md";
import { HiMiniBars3 } from "react-icons/hi2";
import Instacontext from '../contextapi/Instacontext';
import {useNavigate} from 'react-router-dom'

import Addpost from './Addpost';
import Stories from './Stories';
import Message from './Message';
export default function Navbars() {
    const navigate=useNavigate();
    const[username,setUsername]=useState()
    const context=useContext(Instacontext);
    const [inputValue, setInputValue] = useState("");
    const {getUser,fetchAll}=context
    const fetchUser = async () => {
      const userData = await getUser();
      setUsername(userData.username);
      if(username==""){
        fetchUser();
      }
    };
    // let arr=["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR51mgDGvrCdGIUa4KVGg5dIt8sktPnOlHC4A&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG8wDdluXeOvCOgWO1n8LOkWOIn9297RqqDg&s",
    //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG8wDdluXeOvCOgWO1n8LOkWOIn9297RqqDg&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG8wDdluXeOvCOgWO1n8LOkWOIn9297RqqDg&s"]
    const [isFocused, setIsFocused] = useState(false);
    const[isFocus,setisFocuse]=useState(false)
    
    const handleFocus = () => setIsFocused(!isFocused);
    const handleBlur = () => setIsFocused(!isFocused);
    const handleChange = (e) =>{ setInputValue(e.target.value)};
    const handleClear = () => {
      setInputValue('');
      setIsFocused(false);
    };
    const handlefocuse=()=>{
        setisFocuse(!isFocus)
    }
    const handleblure=()=>{
        setisFocuse(!isFocus)
      }
      
      const[notifi,setNotifi]=useState(false)
      const handlefocno=()=>{
      setNotifi(!notifi)
    }
    const handleblno=()=>{
      setNotifi(!notifi)
    }
    // let arr=[{"image":"nill","name":"Prince","id":"prince","followers":"5M"},
    //     {"image":"nill","name":"Prince2","id":"prince2","followers":"5M"},
    //     {"image":"nill","name":"Prince3","id":"prince","followers":"5M"}
    // ]
    const[addpost,setAddpost]=useState(false);
    const handlefocusaddpost=()=>{
      setAddpost(!addpost)
    }
    const handlebluraddpost=()=>{
      setAddpost(!addpost)
    }
    const[more,setmore]=useState(false)
    const handlefocusmore=()=>{
      setmore(!more)
    }
    const handleblurmore=()=>{
      setmore(!more)
    }
    
    const[arr,setArr]=useState([])
    
    const fnetchall=async()=>{
      let val=await fetchAll("allusers");
      setArr(val)
      if(!arr){
          fnetchall();
        }
        // console.log(arr)
      }
      useEffect(()=>{
        fetchUser();
        fnetchall();
        
      },[])
      //     inputValue && val.username.toLowerCase().startsWith(inputValue.toLowerCase())
      // );
        const[filteredUsers,setfilteredUsers]=useState(arr)

  useEffect(()=>{
     let v = arr.filter(val =>
      inputValue && val.username.toLowerCase().startsWith(inputValue.toLowerCase())
    );
      setfilteredUsers(v)
  // console.log(filteredUsers)
  },[inputValue])
   
  const[isMessageopen,setIsMessageOpen]=useState(false)
  const MessageFocus=()=>{setIsMessageOpen(!isMessageopen)}
  return (
    <>
      <div className=' bg-black flex p-3 justify-evenly md:hidden'>
        <h1 className='text-2xl font-alfa text-white flex'>Instagram


        <MdOutlineKeyboardArrowDown
        tabIndex={0}
         className='text-white font-light 
         hover:cursor-pointer h-6 w-6 mt-1 ml-1 focus:outline-none'
         onFocus={handlefocuse}
         onBlur={handleblure}/>
        </h1>
         { isFocus && <div className='fixed top-14 left-10 
         px-6 text-md p-2 text-white bg-[#393939] space-y-2 rounded-lg'>
            <h1 className='text-md flex font-semibold'>Following
                <IoPeopleSharp className='h-5 w-5 ml-3 mt-1'/>
            </h1>
            <h1 className=' text-md flex font-semibold'>Favorites<FaRegStar
             className='h-5 w-5 ml-4 mt-1'/></h1>
            </div>}
        <div className='pt-1'>
        
        <div className="relative">
            {!isFocused && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-500" />
                </div>
                )}
            <input
            className="p-2 pr-10 py-2 w-[50vw] px-10 md:hidden bg-[#393939] rounded-md text-white leading-tight focus:outline-none"
                type="text"
                placeholder="Search"
                // value={inputValue}
                // onFocus={handleFocus}
                // onBlur={handleBlur}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    console.log(e.target.value);
                }}
            />
            {isFocused && (
                <div className="absolute md:hidden inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={handleClear}>
                    <FaTimes className="text-gray-500 h-3 w-3 bg-white rounded-xl" />
                </div>
            )}
            {isFocused && (
                <div className="bg-[#393939] h-full w-80 md:hidden fixed top-[48px] z-50 left-0">
                    <div className='flex justify-between px-2'>
                        <h1 className='text-white font-semibold'>Recent</h1>
                        <h1 className='text-blue-700 hover:cursor-pointer hover:text-blue-900'>Clear All</h1>
                
                    </div>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((element, i) => (
                            <div className='flex bg-[#393939] text-white p-2' key={i}>
                                <div className='h-8 w-8 rounded-3xl'>
                                    <img src={element.pic} alt={element.username} />
                                </div>
                                <div>
                                    <p className='text-white'>{element.username}</p>
                                    <p className='text-gray-500'>{element.fullname}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='text-white p-2'>
                            No such user
                        </div>
                    )}
                </div>
            )}
        </div>
        </div>
        <div>
            <CiHeart className='text-white hover:cursor-pointer font-extrabold h-8 w-8'/>
        </div>

      </div>
      

      {/* Search feature of the users */}
      
      {isFocused && (
        <div  >
        <div className=" bg-black h-full w-80 absolute md:left-[10%] z-20  xl:left-[17%] p-3" >
          <h1 className='text-xl text-white my-3'>Search</h1>
          <input
            className="p-2 pr-10 py-2 w-[20vw] px-6  bg-[#393939] rounded-md text-white leading-tight focus:outline-none"
                type="text"
                placeholder="Search"
                value={inputValue}
                // onFocus={handleFocus}
                // onBlur={handleBlur}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    // console.log(e.target.value);
                }}
            />
            <div className='flex justify-between px-2 py-2'>
                <h1 className='text-white font-semibold'>Recent</h1>
                <h1 className='text-blue-700 hover:cursor-pointer hover:text-blue-900'>Clear All</h1>
            </div>
            {filteredUsers.length > 0 ? (
                        filteredUsers.map((element, i) => (
                            <div className='flex bg-black mt-2 hover:bg-[#393939] hover:rounded-2xl cursor-pointer space-x-4 text-white p-2' key={i} 
                            onClick={()=>{
                            navigate(`/instagram.com/${element.username}`)
                            setTimeout(() => {
                              
                              handleBlur();
                            }, 2000);
                          }}>
                                <div    >
                                    <img src={element.pic} className='h-10 w-10 rounded-full' alt={element.username} />
                                </div>
                                <div className='space-y-1'>
                                    <p className='text-white text-sm font-semibold'>{element.username}</p>
                                    <p className='text-gray-500 text-xs'>{element.fullname}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='text-white p-2'>
                            No such user
                        </div>
                    )}
                </div>
            
        </div>
        
      )}

      {/* //Notification */}
      {notifi && (
        <div >
        <div className=" bg-black h-full w-80 absolute md:left-[10%] z-10  xl:left-[17%] p-3" >
           <h1 className='text-white text-xl'>Notification</h1>
            <h1 className='text-white text-lg my-4'>Today</h1>
            <p className='text-white'>

            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste vel excepturi asperiores labore molestiae veritatis nihil, quisquam sint, error saepe, delectus amet reiciendis dolore. Eum culpa dolores suscipit voluptates fugiat.
            </p>
        </div>
        </div>
      )}

       {
        addpost &&<Addpost setAddpost={setAddpost}/>
       }

      {/* // Left sidebar after the md */}
      <div id='sidebar' className='w-[10%] hidden fixed md:flex 
      md:flex-col text-center
      h-[100vh] xl:w-[17%] bg-black justify-evenly z-10'>
        <div >
          <FaInstagram className=' text-white h-6 w-6 xl:hidden mx-auto'/>
          <h1 className='text-2xl font-alfa text-white text-start ml-6  hidden xl:block '>Instagram</h1>       
        </div>
        <div onClick={()=>{navigate('/instagram.com')}} className='flex space-x-4 hover:cursor-pointer mx-auto   hover:bg-[#2d2c2ce0] xl:mx-2 p-2 rounded-md' >
          <MdHome  className=' text-white h-7 w-7 '/>
          <h1 className='text-md mt-[1px] font-bold hidden  xl:block text-white'>Home</h1>
        </div>
        <div className='flex space-x-4 hover:cursor-pointer mx-auto   hover:bg-[#2d2c2ce0] xl:mx-2 p-2 rounded-md' tabIndex={0} onFocus={handleFocus}
       >
          <FaSearch className=' text-white h-6 w-7 focus:outline-none' 
         />
          <h1 className='text-md mt-[1px] font-bold hidden  xl:block text-white'>Search</h1>
        </div>
        <div className='flex space-x-4 hover:cursor-pointer mx-auto  xl:ml hover:bg-[#2d2c2ce0] xl:mx-2 p-2 rounded-md' >
          <MdOutlineExplore className=' text-white h-7 w-7 '/>
          <h1 className='text-md mt-[1px] font-bold hidden  xl:block text-white'>Explore</h1>
        </div>
        <div className='flex space-x-4 hover:cursor-pointer mx-auto   hover:bg-[#2d2c2ce0] xl:mx-2 p-2 rounded-md' >
          <BiSolidMoviePlay className=' text-white h-7 w-7 '/>
          <h1 className='text-md mt-[1px] font-bold hidden  xl:block
           text-white'>Reels</h1>
        </div>
       
        <div className='flex space-x-4 hover:cursor-pointer hover:bg-[#2d2c2ce0] xl:mx-2 p-2 rounded-md
         mx-auto  ' onFocus={handlefocno} onBlur={handleblno} tabIndex={0}>
          <CiHeart className=' text-white h-7 w-7 '/>
          <h1 className='text-md mt-[1px] font-bold hidden  xl:block
           text-white'>Notification</h1>
        </div>
        <div className='flex space-x-4 hover:cursor-pointer mx-auto   hover:bg-[#2d2c2ce0] xl:mx-2 p-2 rounded-md' >
          <PiMessengerLogoBold className=' text-white h-7 w-7 '/>
          <h1 className='text-md mt-[1px] font-bold hidden 
           xl:block text-white' onClick={()=>navigate('/instagram.com/messages')}>Messages</h1>
        </div>
        <div className='flex space-x-4 hover:cursor-pointer mx-auto  
         hover:bg-[#2d2c2ce0] xl:mx-2 p-2 rounded-md focus:outline-none' onFocus={handlefocusaddpost}  
         tabIndex={0} >
          <MdOutlineAddBox className=' text-white h-7 w-7 ' />
          <h1 className='text-md mt-[1px] font-bold hidden  xl:block
           text-white'>Create</h1>
        </div>
        <div className='flex space-x-4 hover:cursor-pointer mx-auto   hover:bg-[#2d2c2ce0] xl:mx-2 p-2 rounded-md' >
          <FaUser className=' text-white h-7 w-7  rounded-full border-2'/>
          <h1 className='text-md mt-[1px] font-bold hidden 
           xl:block text-white' onClick={()=>{navigate('/instagram.com/profile')}}>Profile</h1>
        </div>
        <div className='flex space-x-4 hover:cursor-pointer mx-auto   hover:bg-[#2d2c2ce0] xl:mx-2 p-2 rounded-md' >
          <HiMiniBars3 className=' text-white h-7 w-7 '/>
          <h1 className='text-md mt-[1px] font-bold hidden 
           xl:block text-white' onFocus={handlefocusmore}  
           tabIndex={0}>More</h1>
        </div>

      </div>
      {more && (
        <div className=" bg-black h-20 w-32 rounded-md fixed bottom-3 left-40  z-50   p-3" >
           <button className='text-white p-2 w-full bg-[#393939] rounded-md hover:bg-[#807b7b]'
           onClick={()=>{
            localStorage.removeItem('token')
            navigate('/')
           }}
           >Log out</button>
        </div>
        
      )}



      {/* Down bar */}
      <div id='sidebar' className='h-[9%]   z-40 md:hidden flex 
       text-center fixed bottom-0 w-full  bg-black justify-evenly '>
        <div >
          <MdHome  onClick={()=>{navigate('/instagram.com')}}  className=' text-white cursor-pointer h-8 w-8 mx-auto mt-2'/>
        </div>
        <div >
          <FaSearch className=' text-white cursor-pointer h-6 w-8 mt-3 mx-auto'/>
        </div>
        <div >
          <MdOutlineExplore className=' text-white cursor-pointer h-8 w-8 mt-2 mx-auto'/>
        </div>
        <div >
          <BiSolidMoviePlay className=' text-white cursor-pointer h-8 w-8 mt-2 mx-auto'/>
        </div>
       
        <div >
          <MdOutlineAddBox className=' text-white cursor-pointer h-8 w-8 mt-2 mx-auto'/>
        </div>
        <div >
          <PiMessengerLogoBold className=' text-white cursor-pointer h-8 w-8 mt-2 mx-auto'/>

        </div>

       
       

      </div>
    

    
    </>
  )
}
