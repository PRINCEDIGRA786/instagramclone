import React from 'react'
import { FaFacebookSquare } from 'react-icons/fa'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Signup() {
  const navigate=useNavigate();
    const[log,setlog]=useState({"email":"","password":"","fullname":"","username":""})
    const handleClick=async()=>{
      // e.preventDefault()
      // console.log("values dekhi",log.email,log.password)
      const response = await fetch("https://instagramclone-taupe.vercel.app/insta/auth/signup", {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ "email":log.email,"password":log.password,"fullname":log.fullname,"username":log.username})
          });
          const json=await response.json();
          // console.log(json)
          if(json.success){
              //Redirect
              localStorage.setItem('token',json.authtoken)
              alert("Sign-up SUCCESSFULLY","success")
              navigate('/instagram.com')
          }
          else{
              alert("some error occured","danger")
          }
      }
  return (
    <>
       
   <div className=' mt-10 '>
    
   
    <form className=' mx-auto border-2 h-[580px] lg:h-[590px] w-[365px] mb-48
       flex flex-col'>
        <div className='p-10 pt-6'>
      <div className='text-center'>
      <h1 className=' text-3xl font-alfa italic'>Instagram</h1>
      </div>
      <div id='fblog' className=' text-center mt-4'>
        <h1 className=' text-md font-semibold text-gray-700'>
        Sign up to see photos and videos from your friends.
        </h1>
        <div className='flex space-x-2 mt-2 text-center p-2 justify-center bg-[rgba(28,161,218,0.85)]  rounded-lg'>
          <div>

          <FaFacebookSquare className=" text-white h-5 w-5"/>
          </div>
        <h1 className=' text-sm font-semibold text-white cursor-pointer'>Log in with Facebook</h1>
        </div>

      </div>
      <div className="flex items-center mt-2" id='or'>
      <div className="flex-grow border-t border-gray-400"></div>
      <span className="flex-shrink mx-4 text-sm font-semibold text-gray-500">OR</span>
      <div className="flex-grow border-t border-gray-400"></div>
    </div>

      <div id='inputs  ' className=' flex mt-4 flex-col space-y-2'>
      <input type="text" id="id"  placeholder='Mobile number or Email' 
      className='h-10  text-xs font-light px-5 text-black
      placeholder:text-black bg-[rgba(250,247,247,0.86)] border-[1.3px] rounded-md 
      focus:outline-none' onChange={((e)=>{
        setlog({
            ...log,
            email:e.target.value
        })
    })}/>
      <input type="text" id="fullname"  className=' h-10 
      text-xs font-thin px-5 bg-[rgba(250,247,247,0.86)] border-[1.3px]  rounded-md
       text-black placeholder:text-black focus:outline-none'
        placeholder='Full Name' onChange={((e)=>{
          setlog({
              ...log,
              fullname:e.target.value
          })
      })}/>
         <input type="text" id="username"  className=' h-10 
      text-xs font-thin px-5 bg-[rgba(250,247,247,0.86)] border-[1.3px]  rounded-md
       text-black placeholder:text-black focus:outline-none'
        placeholder='Username' onChange={((e)=>{
          setlog({
              ...log,
              username:e.target.value
          })
      })}/>
         <input type="text" id="password"  className=' h-10 
      text-xs font-thin px-5 bg-[rgba(250,247,247,0.86)] border-[1.3px]  rounded-md
       text-black placeholder:text-black focus:outline-none'
        placeholder='Password' onChange={((e)=>{
          setlog({
              ...log,
              password:e.target.value
          })
      })}/>
      </div>


     <div className='mt-2 text-center'>
        <p className='text-xs font-thin'>People who use our service may have uploaded your contact information to Instagram. Learn More</p>
     </div>
     <div className='mt-3 text-center'>
        <p className='text-xs font-thin'>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>
     </div>
      <div id='button' className=' mt-4'>
        <button className=' p-1 text-white text-sm font-semibold
         h-8 text-balance  w-full bg-[#1ca1dad9] hover:bg-[#45a7d2f6] rounded-lg hover:bg-blue-900' onClick={()=>handleClick()}>Sign up </button>
      </div>

      </div>
      <div>

    <div className=' text-sm mt-4 w-[365px]  lg:mt-8 border-2  lg:h-16
     mx-auto p-4 text-center'>
      <p>Have an account? <span className=' text-blue-600'>Log in</span></p>
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
