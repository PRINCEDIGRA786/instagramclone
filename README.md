# InstagramClone

InstagramClone is a full-stack social media application built using the MERN stack (MongoDB, Express, React, Node.js) with real-time capabilities powered by Socket.IO. This project replicates core Instagram functionalities like posting images, liking, commenting, and live updates for enhanced user interaction.

The project is designed to provide a robust, scalable, and user-friendly experience with modern web development technologies.

## Table of Contents
- [About](#about)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)

## About

InstagramClone aims to provide a modern social media experience where users can:
- Share posts with captions.
- Like and comment on posts in real-time.
- View updates instantly using live notifications powered by Socket.IO.
- Explore other users' posts with an intuitive and responsive UI.

The project was built as a learning and showcase tool to demonstrate expertise in full-stack development, web sockets, and real-time user interactions.

## Features
- **User Authentication**: Secure login and signup with JWT.
- **Image Uploads**: Drag-and-drop functionality with cloud storage.
- **Real-Time Updates**: Live likes and comments using Socket.IO.
- **Responsive Design**: Fully responsive UI built with React.
- **Profile Management**: Users can view and edit their profiles.
- **Follow System**: Follow/unfollow other users.
- **Notifications**: Receive instant updates for likes, comments, and follows.
## Technologies Used

### Backend
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Backend framework for building RESTful APIs.
- **MongoDB**: NoSQL database for scalable data storage.
- **Socket.IO**: Real-time, bi-directional communication.

### Frontend
- **React.js**: Library for building dynamic and interactive UIs.
- **Tailwindcss**: Cascading Style Sheets version. 
- **Material-UI**: Pre-styled components for a polished UI.

### Deployment
- **Vercel**: Hosting for the frontend.
## Getting Started

Follow these steps to set up the project locally:

### Prerequisites
- **Node.js**: v14+ recommended
- **MongoDB**: Local instance or cloud-based (e.g., MongoDB Atlas)
- **Cloudinary Account**: For image uploads

### Installation
``` bash
1. Clone the repository:   
   git clone https://github.com/your-username/instagramclone.git
   cd instagramclone ```

2. Install Dependencies: 

cd backend
npm install
cd ../frontend
npm install```

3. Set up environment variables: Create a .env file in the backend folder with the following keys:

MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
CLOUDINARY_URL=<your-cloudinary-url>

4. Run the Project:
cd frontend
npm run both
 
 OR

 cd insta
 npm run start 

 cd backend
 nodemon index







### **8. Usage**

```markdown
## Usage
1. Register a new user or log in with existing credentials.
2. Create a new post by uploading an image and adding a caption.
3. Interact with posts by liking or commenting.
4. Follow users to see their posts in your feed.
5. Receive real-time notifications for any interactions.
