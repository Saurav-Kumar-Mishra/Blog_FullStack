import Footer from "./Components/Footer";

import Login from "./Components/Login";
import Navigation from "./Components/Navigation";
import SignUp from "./Components/SignUp";
import { Routes} from "react-router";
import { Route } from "react-router";
import NotFound from "./Components/NotFound";
import BlogTemplete from "./Components/BlogTemplete";
import Dashboard from "./Components/Dashboard";
import Logout from "./Components/Logout";
import AllPosts from "./Components/AllPosts";
import CreatePost from "./Components/CreatePost";

function App() {
  return (
    <div >
      <Navigation/> 
      {/* <Dashboard/> */}
      <Routes>
        {/* <Route path="/" element={<BlogTemplete/>}/> */}
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/blogs" element={<BlogTemplete/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/allPosts" element={<AllPosts/>} />
        <Route path="/createPost" element={<CreatePost/>} />
        <Route path="*" element={<div><NotFound/></div>}/> 
      </Routes>
      <Footer/> 
    </div>
  );
}

export default App;
