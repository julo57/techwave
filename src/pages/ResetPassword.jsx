import React from 'react'
import { useState, useEffect } from 'react';
import useAuthContext from '../context/AuthContext';
import axios from '../api/axios';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
    const { t } = useTranslation("global");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [searchParams] = useSearchParams();
    const { token }= useParams();
    const {csrf} = useAuthContext();


    useEffect(() => {
      setEmail(searchParams.get('email'))
      
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await csrf();
        setErrors([]);
        setStatus(null);
        try{
            const response = await axios.post("/reset-password", {email, token, password, password_confirmation});
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
    <p className="text-center text-2xl font-bold">{t("reset.paragraph")}</p>
    {status && <div className='bg-green-700 m-2 p-2 rounded text-white text-center'>{t("reset.{status}")}
    <div>
      <Link to="/login">{t("reset.div")}</Link>
    </div>
    </div>}
    

    <div className="mt-4">
              <label className="block font-semibold">{t("reset.label")}</label>
              <input className=" shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full" 
              
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("reset.placeholder")}
              />
              {errors.password &&<div className="flex">
        <span className="text-red-400 text-sm m-2 p-2">{errors.password[0]}</span>
      </div>}
          </div>

          <div className="mt-4">
              <label className="block font-semibold" >{t("reset.label2")}</label>
              <input className=" shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full" 
              
              type="password" 
              value={password_confirmation }
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder={t("reset.placeholder2")}
              
             />
             
          </div>
 
        <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {t("reset.button")}
            </button>
            
          </div>
        </form>
    </div>
  </div>
  )
}

export default ResetPassword
