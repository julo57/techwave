import React from "react";
import useAuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom"; // Zaimportuj Navigate

const Profile = () => {
  const { user } = useAuthContext(); // Pobierz informacje o zalogowanym użytkowniku z kontekstu autoryzacji

  // Jeśli użytkownik nie jest zalogowany, przekieruj go na stronę logowania
  if (!user) {
    return <Navigate to="/login" />;
  }
  else{
    return (
      <div>
        <h1>Mój Profil</h1>
        <p>Witaj, {user.name}!</p>
      </div>
    );
  }


};

export default Profile;
