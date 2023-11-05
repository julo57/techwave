import React, { useState } from "react";
import useAuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./ColorChange.css"

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { login, errors } = useAuthContext();
  const { t } = useTranslation("global");

  const handleLogin = async (event) => {
    event.preventDefault();

    const result = await login({ email, password });
    if (result) {
      setIsLoggedIn(true);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">

        <form className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
          <p className="text-center text-2xl font-bold">
            {t("login.paragraph")}
          </p>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {t("login.label")}
            </label>
            <input
              className="shadow appearance-none placeholder-black border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="email"
              placeholder={t("login.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors.email && <div className="flex">
            <span className="text-red-400 text-sm m-2 p-2">{errors.email[0]}</span>
          </div>}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {t("login.label2")}
            </label>
            <input
              className="shadow appearance-none placeholder-black border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder={t("login.placeholder2")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="flex">
              <span className="text-red-400 text-sm m-2 p-2">{errors.password[0]}</span>
            </div>}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              {t("login.button")}
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              {t("login.anchor")}
            </a>
          </div>
        </form>
        <div className="px-8">
          {t("login.div")}
          <Link to="/register" className="text-black">
            <a className="ml-1 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">{t("login.anchor2")}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
