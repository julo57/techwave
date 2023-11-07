import React from 'react'
import { useState } from 'react'
import useAuthContext from '../context/AuthContext';
import axios from '../api/axios';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const { t } = useTranslation("global");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);
    const {csrf} = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await csrf();
        setErrors([]);
        setStatus(null);
        try{
            const response = await axios.post("/forgot-password", {email});
            setStatus(response.data.status)
        } catch(e){
            if(e.response.status === 422){
                setErrors(e.response.data.errors)
              }
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
    <form className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 " onSubmit={handleSubmit}>
    <p className="text-center text-2xl font-bold m-8">{t("forgot.paragraph1")}</p>
    {status && <div className='bg-green-700 m-2 p-2 rounded text-white text-center'>{t("forgot.{status}")}</div>}
    <div className="mb-4">
      
      <input
        className="shadow appearance-none placeholder-black border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    {errors.email && (
      <div className="flex">
        <span className="text-red-400 text-sm m-2 p-2">{errors.email[0]}</span>
      </div>
    )}
 
        <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {t("forgot.paragraph")}
            </button>
            
            <Link to="/login" className="text-black">
              <a className="ml-1 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                {t("login.anchor3")}
              </a>
            </Link>
          </div>
        </form>
    </div>
  </div>
  )
}

export default ForgotPassword
