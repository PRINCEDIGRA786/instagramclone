// import { useEffect, useState } from 'react';
// import { IoClose } from 'react-icons/io5';
// import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// const musicOptions = [
//     { id: 1, title: 'Antidote', url: 'https://cdnsongs.com/music/data/Punjabi/202406/Four_Me/128/Antidote_1.mp3' },
//     { id: 2, title: 'IDK HOW ?', url: 'https://cdnsongs.com/music/data/Punjabi/202406/Four_Me/128/IDK_How_1.mp3' },
//     { id: 3, title: 'YDG', url: 'https://cdnsongs.com/music/data/Punjabi/202406/Four_Me/128/YDG_1.mp3' },
//     // Add more music options here
// ];

// const Watchstory = ({ currentstoryAudio, setModalOpen, d, setCurrentStoryAudio }) => {
//     const [title, setTitle] = useState('');
//     const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
//     const [currentStory, setCurrentStory] = useState('');

//     const playAudio = (url) => {
//         console.log("music is plyuyuaing")
//         const audio = new Audio(url);
//         audio.play();
//         setCurrentStoryAudio(audio);
//     };

//     const stopGanabro =async () => {
//             console.log("Pausing")
//             try {
//                 currentstoryAudio.pause();
//                 currentstoryAudio.currentTime = 0; // Reset the audio
                
//             } catch (error) {
//                 alert(error)
                
//             }
        
//             setCurrentStoryAudio(""); // Clear the current audio
//     };

//     const updateStory = () => {
//         if (!d || !d.story || d.story.length === 0) {
//             return; // No stories to display
//         }
//         const story = d.story[currentStoryIndex];
//         setCurrentStory(story);

//         const matchedMusic = musicOptions.find(element => element.url == story.music);
//         setTitle(matchedMusic ? matchedMusic.title : '');

//         // stopAudio();
//         // playAudio(story.music);
//     };

//     useEffect(() => {
//         updateStory();
//         // return () => stopAudio(); // Cleanup on unmount
//     }, [currentStoryIndex]);

//     const[stop,setStop]=useState(false)
//     const handleNextStory = () => {
//         if (currentStoryIndex < d.story.length - 1) {
//             setCurrentStoryIndex(currentStoryIndex + 1);
//         }
//     };

//     const handlePrevStory = () => {
//         if (currentStoryIndex > 0) {
//             setCurrentStoryIndex(currentStoryIndex - 1);
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-[#141313] bg-opacity-75 flex justify-center items-center z-50">
//             <div className="relative bg-[#393939] w-[400px] h-[400px] rounded-xl shadow-xl shadow-orange-100 text-center border-2 border-orange-100">
//                 {currentStory && (
//                     <img src={currentStory.pic} className="h-full w-full rounded-xl" alt="story" />
//                 )}

//                 <div className="absolute top-4 left-4 flex space-x-3">
//                     <img src={require('../four me.png')} className="h-10 border-2 border-purple-300 w-10 rounded-full" alt="music cover" />
//                     <h1 className="text-sm mt-2 font-thin text-white">{title}</h1>
//                 </div>

//                 <IoClose
//                     className="text-white h-8 w-8 fixed top-2 right-3 hover:cursor-pointer"
//                     onClick={() => {
//                         setStop(true)
//                         stopGanabro();
//                         setModalOpen(false);
//                     }}
//                 />

//                 {currentStoryIndex > 0 && (
//                     <FaArrowLeft
//                         className="text-white h-8 w-8 absolute top-80 left-40 cursor-pointer"
//                         onClick={handlePrevStory}
//                     />
//                 )}

//                 {currentStoryIndex < d.story.length - 1 && (
//                     <FaArrowRight
//                         className="text-white h-20 w-20 absolute top-40 right-28 cursor-pointer"
//                         onClick={handleNextStory}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Watchstory;



import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const musicOptions = [
    { id: 1, title: 'Antidote', url: 'https://cdnsongs.com/music/data/Punjabi/202406/Four_Me/128/Antidote_1.mp3' },
    { id: 2, title: 'IDK HOW ?', url: 'https://cdnsongs.com/music/data/Punjabi/202406/Four_Me/128/IDK_How_1.mp3' },
    { id: 3, title: 'YDG', url: 'https://cdnsongs.com/music/data/Punjabi/202406/Four_Me/128/YDG_1.mp3' },
    // Add more music options here
];

const Watchstory = ({ currentAudio, setModalOpen, d, stopAudio, setCurrentAudio }) => {
    const [title, setTitle] = useState('');
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [currentStory, setCurrentStory] = useState('');

    useEffect(() => {
        if (!d || !d.story || d.story.length === 0) {
            return;
        }

        stopAudio(); // Stop any currently playing audio before starting new audio

        const audio = new Audio(d.story[currentStoryIndex].music);

        // Ensure the audio is fully loaded before playing
        audio.addEventListener('canplaythrough', () => {
            audio.play();
        });

        setCurrentAudio(audio);

        const matchedMusic = musicOptions.find(element => element.url === d.story[currentStoryIndex].music);
        if (matchedMusic) {
            setTitle(matchedMusic.title);
        } else {
            setTitle('');
        }
        setCurrentStory(d.story[currentStoryIndex]);

        return () => {
            audio.pause();
            audio.currentTime = 0;
            audio.removeEventListener('canplaythrough', () => {
                audio.play();
            });
        };
    }, [currentStoryIndex, d, setCurrentAudio, stopAudio]);

    const handleNextStory = () => {
        if (currentStoryIndex < d.story.length - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1);
        }
    };

    const handlePrevStory = () => {
        if (currentStoryIndex > 0) {
            setCurrentStoryIndex(currentStoryIndex - 1);
        }
    };

    return (
        <div className="fixed inset-0 bg-[#141313] bg-opacity-75 flex justify-center items-center z-50">
            <div className="relative bg-[#393939] w-[400px] h-[400px] rounded-xl shadow-xl shadow-orange-100 text-center border-2 border-orange-100">
                <img src={currentStory.pic} className="h-full w-full rounded-xl" />

                <div className="absolute top-4 left-4 flex space-x-3">
                    <img src={require('../four me.png')} className="h-10 border-2 border-purple-300 w-10 rounded-full" alt="music cover" />
                    <h1 className="text-sm mt-2 font-thin text-white">{title}</h1>
                </div>

                <IoClose
                    className="text-white h-8 w-8 fixed top-2 right-3 hover:cursor-pointer"
                    onClick={() => {
                        stopAudio();
                        setModalOpen(false);
                    }}
                />

                {currentStoryIndex > 0 && (
                    <FaArrowLeft
                        className="text-white h-8 w-8 absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointer"
                        onClick={handlePrevStory}
                    />
                )}

                {currentStoryIndex < d.story.length - 1 && (
                    <FaArrowRight
                        className="text-white h-8 w-8 absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                        onClick={handleNextStory}
                    />
                )}
            </div>
        </div>
    );
};

export default Watchstory;
