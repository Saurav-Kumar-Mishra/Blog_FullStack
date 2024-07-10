import React from "react";
import {
  RiUserFill,
  RiMailFill,
  RiLockPasswordFill,
  RiCheckFill,
} from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [didpasswordMatch, setDidPasswordMatch] = React.useState(true);
  const [isUniqueName, setIsUniqueName] = React.useState(true);
  function handleChange(e) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
    console.log(formData);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3009/api/v1/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
      }
      if (data.message === "user name already taken") setIsUniqueName(false);
      else if (data.message === "Password did not match")
        setDidPasswordMatch(false);
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
      }
    } catch (error) {
      console.log("error ", error);
    }

    setFormData(
      {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      }
    )
  };

  return (
    <div
      style={{
        backgroundImage: "url(./sign.jpg)",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "right",
      }}
      className="flex justify-start items-center h-screen"
    >
      <div className="max-w-lg mx-6  text-black bg-gray-300 p-6 rounded-3xl">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form method="post" onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center">
            <RiUserFill className="mr-2" />
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              name="name"
              className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:border-green-500"
              required
            />
            {!isUniqueName && (
              <p className="text-[12px] font-mono text-center  text-red-600">
                user name already taken !
              </p>
            )}
          </div>
          <div className="flex items-center">
            <RiMailFill className="mr-2" />
            <input
              id="SignUpEmail"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              name="email"
              className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-center">
            <RiLockPasswordFill className="mr-2" />
            <input
              id="signUpPassword"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              name="password"
              className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-center">
            <RiCheckFill className="mr-2" />
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              name="confirmPassword"
              className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {!didpasswordMatch && (
            <p className="text-[12px] font-mono text-center  text-red-600">
              password didn't match !
            </p>
          )}
          <div className="flex items-center">
            <RiLockPasswordFill className="mr-2" />
            <select
              id="role"
              value={formData.role}
              onChange={handleChange}
              name="role"
              className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select Role</option>
              <option value="Blogger">Blogger</option>
              <option value="Reader">Reader</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
