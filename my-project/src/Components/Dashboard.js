import React from "react";
import { LiaBlogSolid } from "react-icons/lia";
import { IoEye } from "react-icons/io5";
import "./Dashboard.css";
import { FcViewDetails } from "react-icons/fc";
import { SiNamemc, SiVelog } from "react-icons/si";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { MdAddCircleOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate } from "react-router";
import { User } from "./AppContextProvider";
import Spinner from "./Spinner";

function Dashboard() {
  const navigate = useNavigate();
  // const [user, setUser] = React.useState(null);
  const { user,setUser } = React.useContext(User);
  const [isLoading, setIsLoading] = React.useState(true);

  const tokenFromCookie = Cookie.get("token");

  React.useEffect(() => {
    if (!tokenFromCookie) {
      alert("Login please! session expired");
      navigate("/login");
    } else {
      console.log("inside");
      axios
        .get("http://localhost:3009/api/v1/dashboard", {
          headers: {
            Authorization: `Bearer ${tokenFromCookie}`, // Set token here
          },
        })
        .then((response) => {
          // console.log('Data:', response.data);
          console.log("recieved response",response);
          setUser(response.data);
          // console.log(user);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Invalid Token!! Login Again");
          console.log("Invalid Token");
          navigate('/login');
        });

        
    }
  }, []);
  React.useEffect(()=>{
    console.log(user)
    if (user) {
      if(user.success){
       setIsLoading(false);
      }
     else {
      alert('User Not Found');
      console.log(user.message);
      navigate('/login');
    }
}},[user]);

  if (isLoading) {
    return <Spinner />;
  }

  let totalBlog = 5;
  let totalViews = 1;
  let Profilesrc = "./sk.jpg";
  let userName = "Saurav Kumar Mishra";
  let userEmail = "sauravkumarmishra600@gmail.com";
  let userCountry = "India";

  return (
    <div>
      <div className="flex flex-row-reverse justify-between ">
        <div className=" w-fit h-screen  px-10 pb-10 flex flex-col gap-10 bg-blue-200">
          <h1 className=" text-2xl  font-bold mt-4 p-2 flex  justify-center items-center underline underline-offset-2 under bg-pink-600">
            <FcViewDetails size={50} />
            <p className="">Profile Section</p>
          </h1>
          <div className="flex flex-col w-fit mx-auto rounded-xl items-center gap-5 bg-white pt-5 h-[70%]">
            <img
              className="rounded-lg p-2 border-8"
              src={Profilesrc}
              width="220px"
              height="80px"
              alt="profile Pic"
            />
            <div className="p-5 flex flex-col justify-evenly">
              <p className="text-slate-500 font-bold flex items-center gap-2">
                <SiNamemc /> Name:
                <span className="text-orange-500"> {userName}</span>
              </p>
              <p className="text-slate-500 font-bold flex items-center gap-2">
                <MdOutlineMarkEmailRead />
                Email: <span className="text-orange-500"> {userEmail}</span>
              </p>
              <p className="text-slate-500 font-bold flex items-center gap-2">
                <BiWorld />
                Country: <span className="text-orange-500">
                  {userCountry}
                </span>{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full  h-screen ">
          <div className="marquee text-3xl font-bold my-3  text-red-700">
            <span>Welcome to your Dashboard</span>
          </div>
          <div className="mx-auto w-[80%] border-4">
            <div className="flex justify-around items-center p-5 bg-pink-400">
              <div className="flex flex-col items-center ">
                <p className="text-xl" title="click to view">
                  Total Blog Uploaded: {totalBlog}
                </p>
                <LiaBlogSolid size={50} />
              </div>
              <div className="flex flex-col items-center ">
                <p className="text-xl" title="click to view">
                  Views: {totalViews}
                </p>
                <IoEye size={50} />
              </div>
            </div>
          </div>

          <div className=" w-full flex justify-around items-center ">
            <div className="flex flex-col justify-center items-center">
              <MdAddCircleOutline size={100} />
              <button className="border p-2 px-4 bg-green-600 rounded-xl hover:bg-green-400">
                Add Blog
              </button>
            </div>
            <div className="flex flex-col justify-center items-center">
              <GrUpdate size={100} />
              <button className="border p-2 px-4 bg-green-600 rounded-xl">
                Update Blog
              </button>
            </div>
            <div className="flex flex-col justify-center items-center">
              <MdDelete size={100} />
              <button className="border p-2 px-4 bg-green-600 rounded-xl">
                Delete a Blog
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
