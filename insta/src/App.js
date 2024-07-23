import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Main from "./components/Main";
import Instastate from "./contextapi/Instastate";
import Profile from "./components/Profile";
import Navbars from "./components/Navbars";
import Userpage from './components/Userpage'
import Message from "./components/Message";

function App() {
  return (
    <>
      <Instastate>
        <BrowserRouter>
          <Routes>
            <Route path="/navbar" element={<Navbars />} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/instagram.com" element={<Main />} />
            <Route path="/instagram.com/:id" element={<Userpage />} />
            <Route path="/instagram.com/profile" element={<Profile />} />
            <Route path="/instagram.com/messages" element={<Message />} />


          </Routes>
        </BrowserRouter>
      </Instastate>
    </>
  );
}

export default App;
