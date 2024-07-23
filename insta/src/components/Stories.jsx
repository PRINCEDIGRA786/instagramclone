import React, { useContext, useState, useEffect } from 'react';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import Instacontext from '../contextapi/Instacontext';
import axios from 'axios';
import { IoClose } from 'react-icons/io5';
import { MdKeyboardBackspace } from 'react-icons/md';
import { FaRegPlayCircle } from "react-icons/fa";
import Watchstory from './Watchstory';

const musicOptions = [
  { id: 1, title: 'Antidote', url: 'https://cdnsongs.com/music/data/Punjabi/202406/Four_Me/128/Antidote_1.mp3' },
  { id: 2, title: 'IDK HOW ?', url: 'https://cdnsongs.com/music/data/Punjabi/202406/Four_Me/128/IDK_How_1.mp3' },
  { id: 3, title: 'YDG', url: 'https://cdnsongs.com/music/data/Punjabi/202406/Four_Me/128/YDG_1.mp3' },
  // Add more music options here
];

export default function Stories() {
    const context = useContext(Instacontext);
    const [data, setData] = useState([]);
    let { fetchFo, getUser,story } = context;

    const [startIndex, setStartIndex] = useState(0);
    const [pic, setPic] = useState("");
    const [username, setUsername] = useState("");

    const fn = async () => {
        let user = await getUser();
        setPic(user.pic);
        setUsername(user.username);

        let d1 = await fetchFo(user._id, false, true); // i.e. following's ki posts
        setData(d1);
    };

    useEffect(() => {
        fn();
    }, []);

    const handleNext = () => {
        if (startIndex + 6 < data.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    const[selected,setSelected]=useState(false)
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
         
          alert(url)
        } catch (error) {
          console.error('Error uploading the image', error);
        }
      };
      const [selectedMusic, setSelectedMusic] = useState(null);
      const [currentAudio, setCurrentAudio] = useState(null);
      const[currentstoryAudio,setCurrentStoryAudio]=useState("")
    
      const playAudio = (url, musicId) => {
        // Check if there's currently playing audio
        if (currentAudio) {
          currentAudio.pause(); // Pause the currently playing audio
        }
        const audio = new Audio(url);
        audio.play(); // Play the new audio
        setCurrentAudio(audio); // Set the new audio as the current one
    
        // Update selected music
        setSelectedMusic(musicId);
      };
      const stopAudio = () => {
        if (currentAudio) {
          currentAudio.pause();  // Pause the current audio
          currentAudio.currentTime = 0;  // Reset audio to the beginning
          setCurrentAudio(null);  // Clear the current audio reference
          setSelectedMusic(null);  // Clear the selected music ID
        }
      };
      const[d,setD]=useState()
    const storyShow = async () => {
        let val = await getUser();
        setD(val);
        
        if (!val.story) {
          storyShow();
          return;
        }
      
        setTimeout(() => {
          setModalOpen(true);
        }, 1500);
      
      };
      const storyShowUser = async () => {
        let val = await getUser();
        setD(val);
        
        if (!val.story) {
          storyShow();
          return;
        }
      
        setTimeout(() => {
          setModalOpen(true);
        }, 1500);
      
      };
      

      const[imageandaudio,setImageandAudio]=useState(false);
      const[modalopen,setModalOpen]=useState(false)
    return (
        <>
            <div className='flex text-center space-x-5 sm:space-x-3 sm:pl-20 xl:pl-[21%] md:pl-[18%] lg:pl-[16%] py-4 mb-0 pl-28 bg-black h-full text-white'>
                <div>
                    {/* User can upload story here */}
                    <img src={pic} className='lg:h-16 cursor-pointer md:h-12 sm:h-10 sm:w-10 h-8 w-8 md:w-12 border-2 border-pink-600 lg:w-16 mx-auto rounded-full' alt={`${username}'s profile pic`}
                    onClick={storyShow} />
                    <IoAddCircle className='text-pink-300 cursor-pointer absolute top-14 h-7 w-7' onClick={() => document.getElementById('picUpload').click()} />
                    <h1 className='sm:text-xs text-[5px] font-semibold'>{username}</h1>
                    <input type="file" id="picUpload" accept="image/*" className="hidden" onChange={handleImageChange} />
                </div>
                {data.slice(startIndex, startIndex + 7).map((element, index) => (
                    <div key={index}>
                        <img src={element.pic} className='lg:h-16 md:h-12 sm:h-10 sm:w-10 h-8 w-8 md:w-12 border-2 border-pink-700 lg:w-16 mx-auto rounded-full' alt={`${element.username}'s profile pic`} />
                        <h1 className='sm:text-xs text-[5px] font-semibold'>{element.username}</h1>
                    </div>
                ))}
            </div>
            <div className='mt-4 flex justify-between w-64 mx-auto'>
                <FaArrowAltCircleLeft onClick={handlePrev} disabled={startIndex === 0} className='text-xs cursor-pointer text-white sm:h-5 left-10 top-24 sm:w-5 h-4 w-4 absolute md:top-10 lg:left-32 xl:left-56 md:left-24'>&lt; Prev</FaArrowAltCircleLeft>
                <FaArrowAltCircleLeft onClick={handleNext} disabled={startIndex + 6 >= data.length} className='text-xs cursor-pointer text-white sm:h-5 sm:w-5 h-4 w-4 rotate-180 absolute top-24 right-6 md:top-10 xl:right-[24rem] lg:right-[26%] md:right-[12%]'>Next &gt;</FaArrowAltCircleLeft>
            </div>

            
            {
            selected &&
             <div className="fixed inset-0 bg-[#141313] bg-opacity-75 flex justify-center items-center  z-50">
             <div className="bg-[#393939] w-96 h-96 rounded-xl text-center">
             { image && <img src={image} className='rounded-xl h-full w-full relative ' />}
           { !image && <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2luNmxzcXY4MDJ2aTdwejZ5Nm92bGZ1Z2ZqY3JkOTZjdTA4NzhyZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4EFt4UAegpqTy3nVce/giphy.webp" className='rounded-xl h-40 mx-auto w-40 relative ' />}

                <div className=' space-x-32 bg-[#222020] p-2 px-4 rounded-md 
                flex flex-row top-20 absolute z-20'>
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
              <IoClose className='text-white h-8 w-8 hover:cursor-pointer' onClick={() => setSelected(false)}/>
            </div>
               </div>
           </div>
        }

            
            {last && (
               <div className='music-selection fixed inset-0 bg-gray-600 bg-opacity-90
                text-white flex flex-col justify-start items-center z-50 p-4'>
                    <div className='w-[33vw] p-8 bg-[#393939] rounded-lg'>

               <div className="text-center mb-4">
                   <input 
                       type="text" 
                       placeholder="Search for music..." 
                       className="w-80 p-2 bg-[#525050] text-white rounded-md focus:outline-none"
                    //    value={searchTerm}
                    //    onChange={(e) => setSearchTerm(e.target.value)}
                   />
                   {/* <button onClick={() => setStep(1)} className="ml-2 text-lg">Cancel</button> */}
               </div>
               <div className='music-list w-[vw] overflow-y-auto space-y-8'>
               {musicOptions.map((music) => (
        <div key={music.id} className='music-item group  hover:bg-[#787373] cursor-pointer rounded-md flex justify-between items-center p-2 border-b border-gray-700'>
          <div className='flex items-center'>
            <div className='w-10 h-10 bg-gray-700 rounded-full flex justify-center items-center text-lg font-bold'>
              <img src={require('../four me.png')} className='h-12 w-12 rounded-sm' alt='music cover'/>
            </div>
            <p className='ml-4'>{music.title}</p>
          </div>

          <FaRegPlayCircle
            className={`h-5 w-5 cursor-pointer ${selectedMusic === music.id ? 'text-red-600' : 'text-white'}`}
            onClick={() => playAudio(music.url, music.id)}
          />

        </div>
      ))}

               </div>
               <button  className="mt-4 p-2 bg-blue-600 rounded-md" onClick={()=>{setImageandAudio(true);setLast(false)}}>Next</button>
            </div>
            <IoClose className='text-white h-8 w-8 fixed top-2 right-3 hover:cursor-pointer' onClick={() => {setLast(false);
                stopAudio();
            }}/>
           </div>
            )}

{imageandaudio && (
               <div className="fixed inset-0 bg-[#141313] bg-opacity-75 flex justify-center items-center  z-50">
               <div className="bg-[#393939] w-96 h-96 rounded-xl text-center">
               { image && <img src={image} className='rounded-xl h-full w-full relative ' />}
             { !image && <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2luNmxzcXY4MDJ2aTdwejZ5Nm92bGZ1Z2ZqY3JkOTZjdTA4NzhyZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4EFt4UAegpqTy3nVce/giphy.webp" className='rounded-xl h-40 mx-auto w-40 relative ' />}
  
                  <div className=' space-x-32 bg-[#222020] p-2 px-4 rounded-md 
                  flex flex-row top-20 absolute  z-20'>
                      
                      <h1 className='text-blue-700 text-md hover:text-white  hover:cursor-pointer'
                      onClick={()=>{
                           story(image,currentAudio);
                           setTimeout(() => {
                                setImageandAudio(false)
                           }, 2000);
                          
                      }}>Share</h1>
                      </div>  
                      <div className='w-10 h-10 bg-gray-700 absolute bottom-24 flex justify-center items-center text-lg font-bold'>
              <img src={require('../four me.png')} className=' ' alt='music cover'/>
            </div>
            <IoClose className='text-white h-8 w-8 fixed top-2 right-3 hover:cursor-pointer' onClick={() => {setLast(false);
                stopAudio();
            }}/>
            </div>
           </div>
            )}
            {
            modalopen && (
              // <Watchstory setModalOpen={setModalOpen} stopAudio={stopAudio}  d={d} currentstoryAudio={currentstoryAudio} setCurrentStoryAudio={setCurrentStoryAudio}/>
              <Watchstory setModalOpen={setModalOpen} stopAudio={stopAudio}  d={d} currentAudio={currentstoryAudio} setCurrentAudio={setCurrentStoryAudio}/>
  )}
        </>
    );
}
