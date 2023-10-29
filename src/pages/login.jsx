import React, { useState } from "react";
import useAuthContext from "../context/AuthContext";
import "./ColorChange.css"

export const Login = () => {
  const [email ,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, errors} = useAuthContext();
  
  

  const handleLogin = async (event) => {
    event.preventDefault(); 

    login({email, password})
  }
  return (
    
    <div className="min-h-screen flex items-center justify-center">
  <div className="w-full max-w-md">
    <p className="text-center">Sign in</p>
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" >
          Username
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" 
        type="email" 
        placeholder="Username"
        value={email}
        onChange={(e) =>  setEmail(e.target.value)}
        />
      </div>
      {errors.email &&<div className="flex">
        <span className="text-red-400 text-sm m-2 p-2">{errors.email[0]}</span>
      </div>}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" 
        type="password" 
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password &&<div className="flex">
        <span className="text-red-400 text-sm m-2 p-2">{errors.password[0]}</span>
      </div>}
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
        type="submit">
          Sign In
        </button>
        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
          Forgot Password?
        </a>
      </div>
    </form>
  </div>
</div>

  
  );
};
