import React, { useState, useEffect, useContext } from 'react';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa"; // Import the filled heart icon
import { FaRegComment } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Instacontext from '../contextapi/Instacontext';

const Comment = ({ postId }) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState(2); // Initial number of visible comments
  const context = useContext(Instacontext);
  const { writeReply, commentLike, user,getUser } = context;

  const fetchComments = async () => {
      let user=await getUser();
      setUserId(user._id)
    try {
      const response = await fetch(`http://localhost:5000/insta/comments/posts/${postId}/comments`);
      const data = await response.json();
      setComments(data.map(comment => ({
        ...comment,
        liked: comment.likes.includes(user._id) // Check if the user has liked the comment
      })));
      // console.log(comments)
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };


  // Disklike the post

  const commentDislike = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:5000/insta/comments/${commentId}/unlike`, {
        method: 'DELETE', // Specifying the method type
        headers: {
          'Content-Type': 'application/json', // Ensure the content type is specified
          'auth-token': localStorage.getItem('token') // Correctly including the auth token in the headers
        }
      });
  
      const data = await response.json();
  
      if (data.success) {
        fetchComments(); // Refresh comments if the request is successful
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  


  const[userId,setUserId]=useState()

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const toggleReplies = (index) => {
    const updatedComments = comments.map((comment, idx) => {
      if (idx === index) {
        return { ...comment, showReplies: !comment.showReplies };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const toggleReplyInput = (index) => {
    const updatedComments = comments.map((comment, idx) => {
      if (idx === index) {
        return { ...comment, showReplyInput: !comment.showReplyInput };
      }
      return comment;
    });
    setComments(updatedComments);
   
  };

  const handleLike = async (commentId, index) => {
    try {
      await commentLike(commentId);
      fetchComments()
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const [reply, setReply] = useState("");

  return (
    <div className='comments-section bg-black text-white '>
      {comments.slice(0, visibleComments).map((comment, index) => (
        <div key={index} className='comment overflow-y-auto'>
          <div className='flex space-x-3 cursor-pointer py-4' onClick={() => { navigate(`/instagram.com/${comment.user.username}`) }}>
            <div>
              <img src={comment.user.pic} alt="Loading" className='h-6 w-6 rounded-full' />
            </div>
            <h1 className='font-bold text-xs '>{comment.user.username}</h1>
            <p className='text-sm font-normal'>{comment.content}</p>
          </div>
          <div className='comment-content'>
            <div className='flex py-4 space-x-4'>
              {/* { */}
              {(comment.likes.includes(userId)) ? (
                <FaHeart className='h-3 w-3 cursor-pointer text-red-600' onClick={() =>commentDislike(comment._id)} />
              ) : (
                <CiHeart className='h-3 w-3 cursor-pointer text-white' onClick={() => handleLike(comment._id, index)} />
              )}
              <span className='text-xs font-extrabold'>{comment.likes.length}</span>
              <FaRegComment className='h-3 w-3 cursor-pointer text-white' />
              <span className='text-xs font-extrabold'>{comment.replies.length}</span>
              <button className='text-xs font-extrabold' onClick={() => toggleReplies(index)}>
                {comment.showReplies ? 'Hide replies' : 'View replies'}
              </button>
              <button onClick={() => toggleReplyInput(index)} className='text-xs font-extrabold text-white' >
                {comment.showReplyInput ? 'Cancel' : 'Add reply'}
              </button>
            </div>
            {comment.showReplyInput && (
              <div className='flex space-x-3'>
                <input type='text' placeholder='Add a reply...' className='pb-1 focus:outline-none text-xs placeholder:text-[#7d7b7b]
             bg-transparent border-b-2 border-[#4e4c4c] w-60 mb-4' onChange={(e) => {
                    setReply(e.target.value)
                  }} />
                <button className='hover:text-pink-800 p-1 rounded-lg text-xs px-2 font-extrabold text-pink-500'
                  onClick={() => {
                    writeReply(reply, comment.post, comment._id);
                    fetchComments();
                  }}
                >Reply</button>
              </div>
            )}
          </div>
          {comment.showReplies && (
            <div className='replies'>
              {comment.replies.map((reply, idx) => (
                <div key={idx} className='reply ml-5'>
                  <div className='flex space-x-3  cursor-pointer py-1' onClick={() => { navigate(`/instagram.com/${reply.user.username}`) }}>
                    <div>
                      <img src={reply.user.pic} alt="Loading" className='h-4 w-4  rounded-full' />
                    </div>
                    <h1 className='text-semibold text-xs '>{reply.user.username}</h1>
                    <p className='text-sm' >{reply.content}</p>
                  </div>
                  <div className='reply-content'>
                    <div className='flex py-2 space-x-4'>
                      {reply.likes.includes(userId) ? (
                        <FaHeart className='h-3 w-3 cursor-pointer text-red-600' onClick={() => handleLike(reply._id, idx)} />
                      ) : (
                        <CiHeart className='h-3 w-3 cursor-pointer text-white' onClick={() => handleLike(reply._id, idx)} />
                      )}
                      <span className='text-xs font-extrabold'>{reply.likes.length}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {comments.length > visibleComments && (
        <button onClick={() => setVisibleComments(visibleComments + 5)} className='text-white font-bold'>
          See more
        </button>
      )}
    </div>
  );
};

export default Comment;
