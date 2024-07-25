import React, { useContext, useEffect, useState } from 'react';
import Navbars from './Navbars';
import Instacontext from '../contextapi/Instacontext';
import io from 'socket.io-client';

const serverURL = 'https://instagramclone-taupe.vercel.app'; // Replace with your backend URL
const socket = io(serverURL);

const Message = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const context = useContext(Instacontext);
  let { messagedUser } = context;

  const startfn = async () => {
    let val = await messagedUser();
    setUsers(val);
  }

  useEffect(() => {
    startfn();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      socket.emit('joinRoom', { userId: selectedUser });
fetch(`${serverURL}/insta/messages/${selectedUser}`, {
  mode: 'cors',
  credentials: 'include'
})
  .then(response => response.json())
  .then(data => setMessages(data))
  .catch(error => console.error('Error fetching messages:', error));


      socket.on('receiveMessage', message => {
        if (message.sender === selectedUser || message.receiver === selectedUser) {
          setMessages(prevMessages => [...prevMessages, message]);
        }
      });

      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [selectedUser]);

  const handleSendMessage = () => {
    const message = {
      sender: 'currentUserId', // Replace with actual current user ID from context or state
      receiver: selectedUser,
      content: newMessage
    };
    socket.emit('sendMessage', message);
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <>
      <Navbars />
      <div className="flex ml-52 min-h-[100vh]">
        {/* Left Side: List of Users */}
        <div className="w-80 bg-[#252525] px-6 text-white p-4">
          <h2 className="text-lg font-semibold text-center my-3 mb-6">Messages</h2>
          <ul>
            {users.map(user => (
              <li 
                key={user._id} 
                className={`mt-2 hover:bg-[#393939] border-[0.4px] border-[#424040] text-white space-x-6 flex rounded-lg p-4 cursor-pointer ${selectedUser === user._id ? 'bg-gray-700' : ''}`}
                onClick={() => setSelectedUser(user._id)}
              >
                <div>
                  <img src={user.pic} alt="loading" className='h-12 w-12 rounded-full' />
                </div>
                <div className='flex flex-col text-white font-semibold text-xs'>
                  <h1 className='text-sm'>{user.username}</h1> 
                  <h1>{user.fullname}</h1>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Chat Window */}
        <div className="w-3/4 bg-black text-white p-4">
          {selectedUser ? (
            <div>
              <h2 className="text-lg font-semibold">Chat with {users.find(user => user._id === selectedUser)?.username}</h2>
              <div className="mt-4">
                {messages.map((message, index) => (
                  <div key={index} className={`p-2 my-2 rounded ${message.sender === 'currentUserId' ? 'bg-blue-500' : 'bg-gray-700'}`}>
                    {message.content}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <input 
                  type="text" 
                  className="w-full p-2 bg-gray-800 text-white rounded" 
                  placeholder="Type a message..." 
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                />
                <button 
                  onClick={handleSendMessage} 
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Write a Message</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Message; 
 
