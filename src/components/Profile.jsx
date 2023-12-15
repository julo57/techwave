import React, { useState } from "react";
import useAuthContext from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useTranslation } from "react-i18next";
import Order from "../pages/Order"; 
import Return from "../pages/Return";

const Profile = () => {
  const { user, logout } = useAuthContext();
  const { t } = useTranslation("global");
  const [currentView, setCurrentView] = useState("Order"); // Default view

  const handleLogout = () => {
    logout();
    Cookies.remove('loginCookie');
  }

  const changeView = (view) => {
    setCurrentView(view);
  }

  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div className="min-h-screen flex" style={{ position: 'relative', top: '70px', overflowX: 'hidden' }}>
        {/* Pasek z przyciskami */}
        <div className="w-1/4 flex flex-col items-start justify-start ml-4">
          <div className="w-full text-2xl mb-4">
            <h1>{t("profile.title")} {user.name}!</h1>
          </div>
          <div className="w-full p-4" style={{borderRight: '1px solid gray', paddingRight: '10px'}}>
            <button className="block w-full p-3 mb-4 text-black-500 rounded hover:border-gray-500 hover:border-2 hover:rounded-lg hover:bg-gray-200" onClick={() => changeView("Order")}>{t("profile.button")}</button>
            <button className="block w-full p-3 mb-4 text-black-500 rounded hover:border-gray-500 hover:border-2 hover:rounded-lg hover:bg-gray-200" onClick={() => changeView("Return")}>{t("profile.button2")}</button>
            <button className="block w-full p-3 mb-4 text-black-500 rounded hover:border-gray-500 hover:border-2 hover:rounded-lg hover:bg-gray-200">{t("profile.button3")}</button>
            <Link to="/AccountSettings">
              <button className="block w-full p-3 mb-4 text-black-500 rounded hover:border-gray-500 hover:border-2 hover:rounded-lg hover:bg-gray-200">{t("profile.button4")}</button>
            </Link>
            <button className="block w-full p-3 mb-4 text-red-600 rounded hover:border-red-500 hover:border-2 hover:rounded-lg hover:bg-red-200" onClick={handleLogout}>{t("profile.button5")}</button>
          </div>
        </div>

        {/* Sekcja Order */}
        <div className="w-3/4 p-4">
          {currentView === "Order" && <Order />}
          {currentView === "Return" && <Return />}
        </div>
      </div>
    );
  }
};

export default Profile;
