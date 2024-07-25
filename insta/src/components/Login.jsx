import React from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
const Login = () => {
    const navigate=useNavigate();
    const[log,setlog]=useState({"email":"","password":""})
    const handleClick=async(e)=>{
      e.preventDefault()
      // console.log("values dekhi",log.email,log.password)
      const response = await fetch("https://instagramclone-taupe.vercel.app/insta/auth/login", {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ "email":log.email,"password":log.password})
          });
          const json=await response.json();
          console.log(json)
          if(json.success){
              //Redirect
              localStorage.setItem('token',json.authtoken)
              alert("LOGGED-IN SUCCESSFULLY","success")
              navigate('/instagram.com')
          }
          else{
              alert("Try LOGIN using correct ceredentials please....INVALID CEREDENTIALS","danger")
          }
      }
     
  return ( 
    <>
    
   <div className=' mt-10 '>
    <div className=' lg:flex lg:justify-center lg:space-x-8 mb-52 lg:mb-12'>

    <div>
      <img src="https://balitteknologikaret.co.id/wp-content/uploads/2023/04/Poin-Plus-IGLookup-Mod-Apk.jpg"
       alt="" className='hidden lg:block h-[410px] w-[365px] lg:h-[560px] lg:w-[380px]' />
    </div>
    <form className=' mx-auto border-2 h-[400px] w-[365px] lg:h-[400px] lg:w-[370px]  flex flex-col'>
        <div className='p-10'>
      <div className='text-center'>
      <h1 className=' text-3xl font-alfa italic'>Instagram</h1>
      </div>

      <div id='inputs  ' className=' flex mt-8 flex-col space-y-3'>
      <input type="text" id="id"  placeholder='Phone number, email or username' 
      className='h-10  text-xs font-light px-5 text-black
      placeholder:text-black bg-[rgba(250,247,247,0.86)] border-[1.3px] rounded-md 
      focus:outline-none'  onChange={((e)=>{
        setlog({
            ...log,
            email:e.target.value
        })
    })}/>
      <input type="password" id="password"  className=' h-10 
      text-xs font-thin px-5 bg-[rgba(250,247,247,0.86)] border-[1.3px]  rounded-md
       text-black placeholder:text-black focus:outline-none' placeholder='Password'  onChange={((e)=>{
        setlog({
            ...log,
            password:e.target.value
        })
    })}/>
      </div>

      <div id='button' className=' mt-4'>
        <button className=' p-1 text-white text-sm font-semibold
         h-8 text-balance  w-full bg-[#1ca1dad8] hover:bg-[#1ca1daa0] rounded-lg' onClick={handleClick}>Log in </button>
      </div>

      <div className="flex items-center my-4" id='or'>
      <div className="flex-grow border-t border-gray-400"></div>
      <span className="flex-shrink mx-4 text-sm font-semibold text-gray-500">OR</span>
      <div className="flex-grow border-t border-gray-400"></div>
    </div>

      

      <div id='fblog' className=' text-center mt-8'>
        <div className='flex space-x-2 text-center justify-center'>
          <div>

          <FaFacebookSquare className=" text-blue-900 h-5 w-5"/>
          </div>
        <h1 className=' text-sm font-semibold text-blue-900'>Log in with Facebook</h1>
        </div>
        <p className='text-xs font-light mt-6'>Forgot password?</p>

      </div>

      </div>
      <div>

    <div className=' text-sm w-[365px]  lg:w-[370px] border-2  lg:h-16 mx-auto p-4 text-center'>
      <p>Don't have an account? <span className=' text-blue-600 cursor-pointer' onClick={()=>navigate('/signup')}>Sign up</span></p>
    </div>
    <div className='text-center mt-6 lg:mt-3'>
    <h1 className='text-sm '>Get the app.</h1>
    <div className='flex justify-center space-x-3 mt-4'>
      <div>
        <img className=' h-10 w-32' src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"/> 
      </div>
      <div>
        <img className=' h-10 w-32' src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" alt="Loading" />
      </div>
    </div>
         </div>
      </div>
    </form>
   </div>
   
   </div>
   <footer className="bg-white text-gray-600 py-4 mt-10 border-t border-gray-200">
      <div className="container mx-auto px-4 flex flex-wrap justify-center items-center space-x-4">
        <a href="#" className="text-xs font-thin hover:underline">Meta</a>
        <a href="#" className="text-xs font-thin hover:underline">About</a>
        <a href="#" className="text-xs font-thin hover:underline">Blog</a>
        <a href="#" className="text-xs font-thin hover:underline">Jobs</a>
        <a href="#" className="text-xs font-thin hover:underline">Help</a>
        <a href="#" className="text-xs font-thin hover:underline">API</a>
        <a href="#" className="text-xs font-thin hover:underline">Privacy</a>
        <a href="#" className="text-xs font-thin hover:underline">Terms</a>
        <a href="#" className="text-xs font-thin hover:underline">Locations</a>
        <a href="#" className="text-xs font-thin hover:underline">Instagram Lite</a>
        <a href="#" className="text-xs font-thin hover:underline">Threads</a>
        <a href="#" className="text-xs font-thin hover:underline">Contact Uploading & Non-Users</a>
        <a href="#" className="text-xs font-thin hover:underline">Meta Verified</a>
      </div>
      <div className="container mx-auto px-4 flex justify-center items-center mt-4">
        <span className="text-xs">English</span>
        <span className="text-xs mx-2">© 2024 Instagram from Meta</span>
      </div>
    </footer>
      
    </> 
  )
}

export default Login
