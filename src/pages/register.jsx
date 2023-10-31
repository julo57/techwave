import { useState } from "react";
import useAuthContext from "../context/AuthContext";
import "./ColorChange.css"
import { useTranslation } from "react-i18next";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation , setPasswordConfirmation] = useState("");
  const  {register, errors} = useAuthContext();
  const {t} = useTranslation("global");

  

  const handleRegister = async (event) => {
    event.preventDefault();
    register({name, email, password, password_confirmation})

  };

  return (
    <div className="min-h-screen flex items-center justify-center">  
  <div className="w-full max-w-md">
  <p className="text-center">{t("registry.paragraph")}</p>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleRegister}>
          <div>
              <label className="block font-semibold">{t("registry.label")}</label>
              <input className=" shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full" 
             
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("registry.placeholder")} 
              />
              {errors.name &&<div className="flex">
        <span className="text-red-400 text-sm m-2 p-2">{errors.name[0]}</span>
      </div>}
          </div>

          <div className="mt-4">
              <label className="block font-semibold">{t("registry.label2")}</label>
              <input className=" shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full" 
              
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("registry.placeholder2")} 
              />
              {errors.email &&<div className="flex">
        <span className="text-red-400 text-sm m-2 p-2">{errors.email[0]}</span>
      </div>}
          </div>

          <div className="mt-4">
              <label className="block font-semibold">{t("registry.label3")}</label>
              <input className=" shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full" 
              
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("registry.placeholder3")}
              />
              {errors.password &&<div className="flex">
        <span className="text-red-400 text-sm m-2 p-2">{errors.password[0]}</span>
      </div>}
          </div>

          <div className="mt-4">
              <label className="block font-semibold" >{t("registry.label4")}</label>
              <input className=" shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full" 
              
              type="password" 
              value={password_confirmation }
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder={t("registry.label4")}
              
             />
             
          </div>

          <div className="flex items-center justify-between mt-8">
              <button type="submit" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">{t("registry.button")}</button>
              <a className="font-semibold">
              {t("registry.anchor")}
              </a>
          </div>
      </form>
  </div>
  </div>







) 
  
  
  ;
};