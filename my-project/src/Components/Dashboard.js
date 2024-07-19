import React from "react";
import { LiaBlogSolid } from "react-icons/lia";
import { IoEye } from "react-icons/io5";
import "./Dashboard.css";
import { FcViewDetails } from "react-icons/fc";
import { SiNamemc } from "react-icons/si";
// import { MdOutlineMarkEmailRead } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { MdAddCircleOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
// import axios from "axios";
import Cookie from "js-cookie";
// import { useNavigate } from "react-router";
import Spinner from "./Spinner";
import { CiMail } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {getUser} from "../utils/BlogAsyncThunkAPI";
import {User, getUserStatus, getUserErrors} from '../features/userSlice'

function Dashboard() {
  // const navigate = useNavigate();
  const token = Cookie.get("token");
  const user = useSelector(User)
  const error = useSelector(getUserErrors)
  const status = useSelector(getUserStatus)
  if(user){
  console.log(user);
console.log(status)}
if(error)
  console.log(error)

const dispatch =  useDispatch();

  React.useEffect(()=>{
    dispatch(getUser(token))
    console.log("object")
  },[])


  if (status) {
    return <Spinner />;
  }


  const totalBlogPosted =(user && user.posts.length) ||  0 ;
  const totalViews = 0;
  const Profilesrc = "./sk.jpg";
  const userName = (user && user.name) ||  "no name";
  const userEmail = (user && user.email) || "no defined";
  const userCountry =( user && user.country) ||  "Unknown";

  return (
    <div className="flex flex-col lg:flex-row ">
      <div className="w-full lg:w-1/4 h-full lg:h-screen px-4 pb-10 bg-blue-100">
        <h1 className="text-2xl font-bold mt-4 p-2 text-center underline underline-offset-2 bg-[#ffecb3] flex justify-center">
          <FcViewDetails size={50} />
          Profile Section
        </h1>
        <div className="flex flex-col items-center gap-5 bg-white p-5 rounded-xl mt-5">
          <img
            className="rounded-lg p-2 border-8"
            src={Profilesrc}
            width="220px"
            height="80px"
            alt="Profile Pic"
          />
          <div className="py-5 flex flex-col gap-2 w-full">
            <p className="text-slate-500 font-bold flex items-center gap-2 ">
              <SiNamemc /> Name:
              <span className="text-orange-500"> {userName}</span>
            </p>
            <p className="text-slate-500 font-bold flex items-center gap-2">
              <CiMail/>
              Email: <span className="text-orange-500"> {userEmail}</span>
            </p>
            <p className="text-slate-500 font-bold flex items-center gap-2">
              <BiWorld />
              Country: <span className="text-orange-500">{userCountry}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 h-full lg:h-screen p-4">
        <h1 className="text-3xl font-bold text-center p-2 text-red-700">
          Welcome to your Dashboard ....
        </h1>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 mx-2 h-[80%]">
          <Link to='/allPosts' className="rounded-xl bg-white shadow-sm p-4 flex flex-col items-center justify-center">
            <LiaBlogSolid size={50} />
            <p>Total blogs: {totalBlogPosted}</p>
          </Link>
          <div className="rounded-xl bg-white shadow-sm p-4 flex flex-col items-center justify-center">
            <IoEye size={50} />
            <p>Total views: {totalViews}</p>
          </div>
          <Link to="/createPost" className="rounded-xl bg-white shadow-sm p-4 flex flex-col items-center justify-center  ">
            <MdAddCircleOutline size={50} className="hover:animate-bounce" />
            <p>Add New Blog</p>
          </Link>
          <div className="rounded-xl bg-white shadow-sm p-4 flex flex-col items-center justify-center">
            <MdDelete size={50} />
            <p>Delete Blog</p>
          </div>
          <div className="rounded-xl bg-white shadow-sm p-4 flex flex-col items-center justify-center">
            <GrUpdate size={50} />
            <p>Update Blog</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
