import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {logout} from '../features/userSlice'
import { useDispatch,useSelector } from "react-redux";
function Logout() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  dispatch(logout());
  const isLogged = useSelector((state)=> state.user.isLoggedIn);
  console.log(isLogged)
  if(isLogged===false)
  {
    toast.success(`🦄 ${"logout successfull"}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log("logout successfully");
    navigate('/login')
   
  }
  
  return <div></div>;
}

export default Logout;
