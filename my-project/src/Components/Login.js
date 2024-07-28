import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/BlogAsyncThunkAPI";
import { useDispatch } from "react-redux";


const Login = () => {
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData((prevLoginData) => {
      return {
        ...prevLoginData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(login(loginData));
    if (login.fulfilled.match(resultAction)) {
      
      const role = resultAction.payload.role;
      if (role === 'Blogger') {
        navigate('/dashboard');
      } else if (role === 'Reader') {
        navigate('/blogs');
      }
    }
  };

 

  const handleForgotPassword = () => {
    console.log("Forgot Password clicked");
  };

  return (
    <div
      style={{
        backgroundImage: "url(./loginBackground.jpg)",
        backgroundSize: "cover",
      }}
      className="w-screen h-[92vh] flex flex-col justify-start items-center p-4 "
    >
      <img src="./logo2.png" width="250px" alt="img not found" className="mb-4 mt-20" />
      <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-4xl font-mono font-thin text-green-700 mb-4 text-center">
          Login to your account
        </h2>
        <h2 className="text-xl mb-4 text-center">
          Don't have an account?{" "}
          <Link to="/signUp" className="text-blue-700 font-bold">
            signUp here
          </Link>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="on">
          <div>
            <label htmlFor="email" className="block mb-1 text-black">
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={loginData.email}
              name="email"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-black">
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={loginData.password}
              name="password"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-blue-500 hover:underline focus:outline-none mt-2 md:mt-0"
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
