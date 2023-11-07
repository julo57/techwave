import React from "react";
import useAuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie'; // Importuj bibliotekę js-cookie
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { user, logout } = useAuthContext(); // Pobierz informacje o zalogowanym użytkowniku i funkcję wylogowywania z kontekstu autoryzacji
  const { t } = useTranslation("global");
  // Funkcja do wylogowywania i czyszczenia cookies
  const handleLogout = () => {
    logout(); // Wyloguj użytkownika
    Cookies.remove('loginCookie'); // Usuń cookie związane z logowaniem
  }

  // Jeśli użytkownik nie jest zalogowany, przekieruj go na stronę logowania
  if (!user) {
    return <Navigate to="/login" />;
  }
  else{
    return (
      <>
        <div className="min-h-screen flex flex-col items-start justify-start ml-4" style={{position: 'relative', top: '70px', overflowX: 'hidden'}}>
          <div className="w-full text-2xl" style={{position: 'relative', top: '1px', left: '60px', bottom: '20px'}}>
            <h1>{t("profile.title")} {user.name}!</h1>
          </div>
          <div className="w-1/4 p-4" style={{borderRight: '1px solid gray', paddingRight: '10px'}}>
            <button className="block w-full p-3 mb-4 text-black-500 rounded hover:border-gray-500 hover:border-2 hover:rounded-lg hover:bg-gray-200">{t("profile.button")}</button>
            <button className="block w-full p-3 mb-4 text-black-500 rounded hover:border-gray-500 hover:border-2 hover:rounded-lg hover:bg-gray-200">{t("profile.button2")}</button>
            <button className="block w-full p-3 mb-4 text-black-500 rounded hover:border-gray-500 hover:border-2 hover:rounded-lg hover:bg-gray-200">{t("profile.button3")}</button>
            <button className="block w-full p-3 mb-4 text-black-500 rounded hover:border-gray-500 hover:border-2 hover:rounded-lg hover:bg-gray-200">{t("profile.button4")}</button>
            <button className="block w-full p-3 mb-4 text-red-600 rounded hover:border-red-500 hover:border-2 hover:rounded-lg hover:bg-red-200" onClick={handleLogout}>{t("profile.button5")}</button>
          </div>
        </div>
      </>
    );
  }
};

export default Profile