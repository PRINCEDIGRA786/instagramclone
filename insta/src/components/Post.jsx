import React, { useContext, useState, useEffect } from 'react';
import Instacontext from '../contextapi/Instacontext';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Comment from './Comment';

export default function Post({ num, setCheckpost,usernameid,idpic, arr }) {
    const [username, setUsername] = useState(usernameid);
    const [picnum, setpicnum] = useState(num);
    const [pic, setpic] = useState(idpic);
    const context = useContext(Instacontext);
    const [caption, setCaption] = useState("");
    let { picDetails,writeComment } = context;

    const handleNumber = (param) => {
        let newNum;
        if (param === 'add') {
            newNum = (picnum + 1) % arr.length;
        } else {
            newNum = (picnum - 1 + arr.length) % arr.length;
        }
        setpicnum(newNum);
    };
    const[postId,setPostId]=useState("")
    const captionkeliye=async()=>{
        let value= await picDetails(picnum,usernameid)
        if(value.caption){
            setCaption(value.caption)
            setPostId(value._id)
        }
        else{
            setCaption("no caption")

        }
    }

    useEffect(()=>{
        // let value= picDetails(picnum)
        // console.log("The caption is: ",value.caption)
    //    console.log("ye chla for picnum",picnum)
        captionkeliye();

    },[picnum])
    const[comment,setComment]=useState('')

    return (
        <>
          
 <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-end items-center mr-20 z-50">
                <div className="bg-black w-[81%] h-[95%] flex rounded-xl text-center">
                    <div className='h-full w-[60%]'>
                        <img src={arr[picnum]} className='h-[100%] rounded-xl' />
                    </div>

                    <div className='w-[40%] m-4 text-white overflow-y-auto'>
                        <div className='flex justify-between'>
                            <div className='flex space-x-4'>
                                <div>
                                    <img src={pic} alt="Loading" className='h-10 w-10 rounded-full' />
                                </div>
                                <h1 className='text-semibold text-md mt-2'>{username}</h1>
                            </div>

                            <div>
                                <HiOutlineDotsHorizontal className='text-white h-7 w-7 mt-4 mr-2' />
                            </div>
                        </div>

                        <div className='my-5 flex space-x-3 overflow-y-auto'>
                            <img src={pic} alt="Loading" className='h-7 w-7 rounded-full' />
                            <p className=' text-justify space-x-2 p-2'>

                            <span className='font-bold text-md '>{username}</span>
                            <span className='text-white text-xs font-semibold '>{caption}</span>
                            </p>
                        </div>

                        <div className=' h-80 pb-4'>
                            <Comment postId={postId}/>
                        </div>
                        <div className='fixed mt-5 z-50 bottom-6 right-32 flex space-x-2'>
                        <input type='text' placeholder='Add a comment ........' className='pb-3 
                         focus:outline-none placeholder:text-[#7d7b7b] bg-[#393939] rounded-xl px-4 pt-2 border-b-2
                          border-[#4e4c4c]   text-sm focus:placeholder:text-slate-100 w-[300px]'onChange={(e)=>{
                            setComment(e.target.value)
                          }} />
                           <button className='text-blue-400 hover:text-blue-700 rounded-lg text-sm  font-extrabold 
                        ' onClick={async()=>{
                           let p=await picDetails(picnum,username); 
                          //  console.log("p is: ",p);
                           writeComment(comment,p._id);
                           window.location.reload();
                           }}>Post</button>        </div>
          
                    </div>
                </div>
            </div>
            <div className='fixed top-0 right-2'>
                <IoClose className='text-white h-8 w-8 hover:cursor-pointer' onClick={() => setCheckpost(false)} />
            </div>

            <div className='fixed top-[40%] left-[20%] shadow-xl rounded-xl bg-black shadow-black z-50'>
                <FaArrowAltCircleLeft className='text-white h-8 w-8 cursor-pointer' onClick={() => handleNumber("minus")} />
            </div>
            <div className='fixed top-[40%] right-[40%] shadow-xl rounded-xl bg-black shadow-black z-50'>
                <FaArrowAltCircleLeft className='text-white h-8 w-8 rotate-180 hover:cursor-pointer' onClick={() => handleNumber("add")} />
            </div>
        </>
    );
}
