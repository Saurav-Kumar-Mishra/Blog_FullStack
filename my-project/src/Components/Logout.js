import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { User } from "./AppContextProvider";

function Logout() {
  const navigate = useNavigate();
  const [data, setData] = React.useState(false);
  const {setIsLogged}=React.useContext(User);
  try {
    React.useEffect(()=>{axios.get("http://localhost:3009/api/v1/logout").then((Response) => {
      setData(Response.data);
    })},[])
    
    console.log(data);
  } catch (err) {
    console.log(err);
  }
  if (data.success === true) {
    console.log("logout successfully");
    toast.success(`🦄 ${data.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setIsLogged(false);
    navigate("/login");
  } else {
    toast.error(`${data.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return <div></div>;
}

export default Logout;
