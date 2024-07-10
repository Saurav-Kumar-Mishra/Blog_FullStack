import React ,{ useContext}from 'react';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import AppContextProvider from './AppContextApi';
import { useUser } from './AppContextProvider';


const Login = () => {

const {loggedIn} = useUser();
// console.log(isLoggedIn)
  const navigate=useNavigate();
// setIsLoggedIn(true)
  const [loginData, setLoginData]=React.useState({
    email:"",
    password:""
  })

  const handleChange = (e) => {

    setLoginData((prevLoginData)=>{
   return  {
      ...prevLoginData,
      [e.target.name]:e.target.value
    };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3009/api/v1/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
        
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
      else {
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
        navigate('/')
      }
    } catch (error) {
      console.log("error ", error);
    }

  };
  

  const handleForgotPassword = () => {
    // Here you can implement the logic to handle forgot password functionality
    console.log('Forgot Password clicked');
  };

  return (
    <div style={{backgroundImage:"url(./loginBackground.jpg)" , backgroundSize:"cover"}} className='w-screen h-[91vh] flex flex-col justify-start items-center'>
      <img src='./logo2.png' width="250px" alt='img not found' />
    <div className="max-w-md mx-auto pt-6 text-black">
      <h2 className="text-4xl font-mono font-thin text-green-700 mb-4 text-black">Login to your account</h2>
      <h2 className="text-xl  mb-4 text-black font-bold">Don't have an account? <Link to="/signUp" className="text-blue-700 text-xl font-bold">signUp here</Link></h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 text-black">Email:</label>
          <input
            id="email"
            type="email"
            value={loginData.email}
            name='email'
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 text-black">Password:</label>
          <input
            id="password"
            type="password"
            value={loginData.password}
            name='password' 
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Login</button>
          <button type="button" onClick={handleForgotPassword} className="text-blue-500 hover:underline focus:outline-none">Forgot Password?</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;
