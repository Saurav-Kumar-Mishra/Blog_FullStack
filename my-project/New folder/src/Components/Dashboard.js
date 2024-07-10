import React from "react";
import { LiaBlogSolid } from "react-icons/lia";
import { IoEye } from "react-icons/io5";
import "./Dashboard.css";

function Dashboard() {
  let totalBlog = 5;
  let totalViews = 1;
  return (
    <div>
      <div className="marquee">
        <span>Welcome to your Dashboard</span>
      </div>
      {/* <div className='Blog Details flex items-center justify-center '> */}
      <div className="mx-auto w-[80%] border-4">
        <div className="flex justify-around items-center p-5">
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
      <div className="mx-auto w-[80%] border-4">{/* add blog */}</div>
    </div>
  );
}

export default Dashboard;
