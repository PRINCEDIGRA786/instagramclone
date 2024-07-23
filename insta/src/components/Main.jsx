import React, { useContext } from 'react'
// import Navbars from './Navbars'
import { useState } from 'react';
import { useEffect } from 'react';
import Instacontext from '../contextapi/Instacontext'
import Navbars from './Navbars';
import { useNavigate } from 'react-router-dom';
import Stories from './Stories';
import Body from './Body'
export default function Main() {
  const  context=useContext(Instacontext)
  const navigate=useNavigate()
  let {getUser,fetchAll,follow}=context
  const[username,setusername]=useState()
  const[fullname,setfullname]=useState()
  const[pic,setpic]=useState();
  const[allusers,setAllusers]=useState([])
  const fetchUser = async () => {
    const userData = await getUser();
    const d=await fetchAll(false);
    setAllusers(d)
    setusername(userData.username);
    setfullname(userData.fullname);
    setpic(userData.pic)
    if(username==""){
      fetchUser();
    }
  };
  useEffect(()=>{
    fetchUser();
    // console.log("username",username)
    if(!localStorage.getItem('token')){
      alert("You are not logged in")
      navigate('/')

    }

  },[]);
  const[f,setF]=useState(false)
  return (
    <>
      {/* Suggested for you after the lg:
       */}
       <Navbars/>
       <Stories/>
       <Body/>
    
<div className='w-[24vw] h-[100vh] bg-black fixed 
 hidden  lg:block right-0 top-0'>
                <div className='flex px-2 space-x-3 my-p-2 py-3 hover:bg-[#272626] hover:px-2 hover:rounded-lg'>
                    <div className=''>
                    <img src={pic} alt="loading" className=' h-16 w-16 mt-1 
                    rounded-full'/>
                    </div>
                    <div className='flex justify-around ml-3 hover:cursor-pointer'
                     onClick={()=>{navigate('/instagram.com/profile')}} >
                      <div className='mt-2'>
                        <p className='text-white text-sm font-semibold'>{username}</p>
                        <p className=' text-gray-500 text-md font-medium'>{fullname}</p>
                      </div>
                      <h1 className='text-blue-500 ml-12 mt-3 text-sm'>Switch</h1>
                    </div>

                </div>

                <div className=' flex justify-around py-2'>
                  <h1 className='text-[#c4bfbf]'> Suggested for you</h1>
                  <h1 className='text-white text-sm'>See All</h1>
                </div>

                {/* Suggested persons
                 */}
                 <div className='my-3 space-y-4 px-2 pr-8'>

               { allusers.map((element ,i)=>(
                 
              < div className='flex justify-between py-2 duration-500 hover:bg-[#383737] hover:px-2 hover:rounded-lg' key={i}>
                   <div className='flex space-x-3 cursor-pointer  ' onClick={()=>{navigate(`/instagram.com/${element.username}`)}}>
                   <img src={element.pic} className='h-12 w-12 rounded-full' alt="loading"/>
                   <div>
                       <p className='text-white text-sm mt-2  font-semibold'>{element.username}</p>
                       <p className='text-[#7e7a7a] text-xs mt-1 font-semibold'>New to Instagram .</p>

                       </div>
                   </div>
                   
                       {/* <p className=' text-gray-100'>Followed by amr</p> */}
                   
                   <h1 className='text-blue-500 text-sm mt-3 cursor-pointer hover:text-blue-600' onClick={()=>{
                    follow(element.username);
                    setF(true)
                    setTimeout(() => {
                      fetchUser();
                      setF(false)
                    }, 2000);
                   }}>{f?'Unfollow':'Follow'}</h1>
               </div>
              )) 
                }
                 </div>

                 <footer className="bg-black text-gray-400 px-6 py-4 mt-10 border-t border-gray-200">
      <div className="container mx-auto px-1 flex flex-wrap  items-center space-x-4">
        <a href="#" className="text-xs font-thin hover:underline">Meta</a>
        <a href="#" className="text-xs font-thin hover:underline">About</a>
        <a href="#" className="text-xs font-thin hover:underline">Blog</a>
        <a href="#" className="text-xs font-thin hover:underline">Jobs</a>
        <a href="#" className="text-xs font-thin hover:underline">Help</a>
        <a href="#" className="text-xs font-thin hover:underline">API</a>
        <a href="#" className="text-xs font-thin hover:underline">Instagram Lite</a>
        <a href="#" className="text-xs font-thin hover:underline">Threads</a>
        <a href="#" className="text-xs font-thin hover:underline">Contact </a>
        <a href="#" className="text-xs font-thin hover:underline">Meta Verified</a>
        
      </div>
      <div className="container  px-4 flex  items-center mt-4">
        <span className="text-sm">English</span>
        <span className="text-sm">© 2024 Instagram from Meta</span>
      </div>
    </footer>

       </div>
      
    </>
  )
}
