import React, { useContext,useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import Instacontext from '../contextapi/Instacontext'
import { useNavigate } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";

// Component to show the list of the users both in following and the followers
export default function Follusers({following,followers,id,setIsselected}) {
    const navigate=useNavigate();
    const context=useContext(Instacontext);
    const[isfollowing,setIsfollowing]=useState(true)
    const[list,setList]=useState([])
    let{fetchFo,follow,unfollow}=context;
    const fn=async()=>{
        let d=await fetchFo(id,followers,following);
        setList(d);
    }
    useEffect(()=>{
        fn();
    },[])
  return (
    <>
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center  z-50">
          <div className="bg-[#393939] w-[39vw] px-5 py-4 h-[90vh] overflow-y-auto  rounded-xl text-center">
                <div className=''>
                <input type="text" name="search" id="search" className='bg-[#393939] pl-2 focus:outline-none
                text-[#8f8b8b] border-b-2 border-[#9d9797] focus:text-white focus:font-semibold duration-1000 hover:w-80' placeholder='Search here'/>
                {/* <IoIosSearch className='text-[#8f8b8b] h-5 w-6 absolute border-[#9d9797]  top-[51px]
                 border-b-2  left-[41%]'/> */}

                </div>
                    <div className=' mt-4'>

                     {
                         list.map((element,i)=>(
                             <div className='flex space-x-[52%]'  key={i}>
                                <div className='flex py-4 w-80 space-x-3 '>

                   <div className=' cursor-pointer ' 
                   onClick={()=>{navigate(`/instagram.com/${element.username}`)}}>
                   <img src={element.pic} className='h-12 w-12 rounded-full' alt="loading"/>
                   </div>
                   <div className='mt-1'>
                       <p className='text-white text-xs   font-semibold'>{element.username}</p>
                       <p className='text-white text-xs mt- font-semibold'>{element.fullname}</p>

                   </div>
                       </div>
                   <div>
                    {/* <button type="button" className=' bg-blue-500 p-1 text-sm rounded-md mt-3 px-3  text-white'>Follow</button> */}
                   
      <div>
      <button  className=' bg-blue-500 p-1 text-sm rounded-md mt-3 px-2  text-white' onClick={()=>{
        // unfollow(element.username);
        // setIsfollowing(false);
        // fn();s
      }}>Message</button> 


       </div>
    

   
                   
                   </div>
                   
               </div>
                        ))
                    }           
                    </div>
          </div>
        <div className='fixed top-0 right-2'>
                <IoClose className='text-white h-8 w-8 hover:cursor-pointer' onClick={() =>setIsselected(false)} />
            </div>
        </div>

      
    </>
  )
}
