import React, { useContext, useEffect, useState } from 'react'
import { TfiGallery } from "react-icons/tfi";
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import { FaLocationPin } from "react-icons/fa6";
import { MdKeyboardBackspace } from "react-icons/md";
import Instacontext from '../contextapi/Instacontext';
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
export default function Addpost({setAddpost}) {
    const navigate=useNavigate()
    const[selected,setSelected]=useState(false);
    const context=useContext(Instacontext);
    const[caption,setCaption]=useState("")
    let{getUser,addPost}=context;
    const[pic,setpic]=useState();
    const[username,setusername]=useState()
    const fetchUser = async () => {
        const userData = await getUser();
        setusername(userData.username);
        setpic(userData.pic)
        if(username==""){
          fetchUser();
        }
      };
      useEffect(()=>{
        fetchUser()
       
    
      },[])
    const[image,setImage]=useState()
    const[url,setUrl]=useState();
    const[last,setLast]=useState();
    const handleImageChange=(e)=>{
        handleUpload(e.target.files[0])
        setSelected(true);
    }
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
          setImage(response.data.secure_url)
        // setImage("https://res.cloudinary.com/dblmdnfdt/image/upload/v1720839729/ugvpwcfip4mbgir0iogr.jpg")
         
          // alert(url)
        } catch (error) {
          console.error('Error uploading the image', error);
        }
      };
  return (
    <>
      {/* For the add post */}
      {
      
      !selected &&
      <div className="fixed inset-0 bg-[#141313] bg-opacity-75 flex justify-center items-center  z-50">
          <div className="bg-[#393939] w-96 h-96 rounded-xl text-center">
          
            <div>
              <h1 className=' text-white text-lg mt-1 font-bold'>Create new post</h1>
             
            </div>
            <div>
              <TfiGallery className='text-white h-28 w-28 mx-auto mt-[22%]'/>
            </div>

            <h1 className='text-white text-xl my-2 '>Drag photos and videos here</h1>
            
            <button 
              className="mt-1 bg-blue-600 hover:bg-blue-700 my-5 text-white rounded-md px-3 font-bold p-1 text-sm "
              onClick={() => document.getElementById('imageInput').click()}
            >
              Select from Computer
            </button>
            <input
        type="file"
        id="imageInput"
        className="hidden"
        onChange={handleImageChange}
      />
       <div className='absolute top-2 right-5'>
              <IoClose className='text-white h-8 w-8 hover:cursor-pointer' onClick={() => setAddpost(false)}/>
            </div>
          </div>
        </div>}

        {/* 2nd step of filter */}
        {
            selected &&
             <div className="fixed inset-0 bg-[#141313] bg-opacity-75 flex justify-center items-center  z-50">
             <div className="bg-[#393939] w-96 h-96 rounded-xl text-center">

           { image && <img src={image} className='rounded-xl h-full w-full relative ' />}
           { !image && <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2luNmxzcXY4MDJ2aTdwejZ5Nm92bGZ1Z2ZqY3JkOTZjdTA4NzhyZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4EFt4UAegpqTy3nVce/giphy.webp" className='rounded-xl h-40 mx-auto w-40 relative ' />}

                <div className=' space-x-32 bg-[#222020] p-2 px-4 rounded-md flex flex-row top-24 absolute z-20'>
                    <div >
                        <MdKeyboardBackspace className='h-7 w-7 text-white'/>
                    </div>
                    <h1 className='text-white text-md font-bold'>Crop</h1>
                    <h1 className='text-blue-700 text-md hover:text-white hover:cursor-pointer'
                    onClick={()=>{
                        setSelected(false);
                        setLast(true)
                    }}>Next</h1></div>  
                     <div className='absolute top-2 right-5'>
              <IoClose className='text-white h-8 w-8 hover:cursor-pointer' onClick={() => setAddpost(false)}/>
            </div>
               </div>
           </div>
        }

        {
            last &&
             <div className="fixed inset-0 bg-[#141313] bg-opacity-75 flex justify-center items-center  z-50">
             <div className="bg-[#393939] w-[700px] h-96 rounded-xl text-center flex">
             <div>
             <img src={image} className='rounded-xl h-full  w-[350px] ' />
                <div className=' space-x-52 bg-[#222020] w-[700px] p-2 px-4 rounded-md flex flex-row top-24 absolute z-20'>
                    <div >
                        <MdKeyboardBackspace className='h-7 w-7 text-white'/>
                    </div>
                    <h1 className='text-white text-md font-bold'>Create new post</h1>
                    <h1 className='text-blue-700 text-md hover:text-white hover:cursor-pointer'
                    onClick={()=>{
                        addPost(url,caption);
                        setAddpost(false)
                        navigate('/instagram.com')
                        
                    }}>Share</h1>
                    </div>  
                    </div>
               
               <div className='mt-12 px-5 w-[350px] overflow-y-auto'>
                <div className='flex space-x-2'>
                <img src={pic} className=' h-10 w-10 rounded-full'/>
                <h1 className='text-white text-md font-semibold mt-1'>{username}</h1>

                </div>
                <div className='my-3'>
                    <textarea className=' bg-[#393939] w-full h-40 text-white
                    focus:outline-none border-[1px] p-2 rounded-md'
                    onChange={(e)=>{
                        setCaption(e.target.value)
                    }}
                    placeholder='Write a caption...........'></textarea>
                </div>
                <div className='text-white text-md text-start my-2 flex justify-between'>
                    <h1 className='text-[#7a7878]'>Add Location</h1>
                    <div>

                    <FaLocationPin className='text-white h-4 w-4'/>
                    </div>
                </div>
                <div className='text-white text-md text-start flex flex-col space-y-4 '>
                   <div className='flex justify-between'>
                    <h1>
                        Accessibility
                    </h1>
                    <div><FaChevronDown className='h-5 w-5 '></FaChevronDown></div>
                   </div>
                   <div className='flex justify-between'>
                    <h1>
                        Advanced Setting
                    </h1>
                    <div><FaChevronDown className='h-5 w-5 '></FaChevronDown></div>
                   </div>
                </div>
               </div>
               <div className='absolute top-2 right-5'>
              <IoClose className='text-white h-8 w-8 hover:cursor-pointer' onClick={() => setAddpost(false)}/>
            </div>
           </div>
           </div>

        }

       
           
    </>
  )
}
