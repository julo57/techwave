import React, { useContext } from "react";
import { ThemeContext } from "../App";
import "./ThemeSwitchButton.css"; // Importuj arkusz CSS

function ThemeSwitchButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={`theme-switch-button ${theme === "dark" ? "dark" : ""}`}
      onClick={toggleTheme}
    >
      <div className="ball">
        <span role="img" aria-label="Moon" className={`moon ${theme === "dark" ? "dark" : ""}`}>
          🌙
        </span>
        <span role="img" aria-label="Sun" className={`sun ${theme === "dark" ? "dark" : ""}`}>
          ☀️
        </span>
      </div>
    </div>
  );
}

export default ThemeSwitchButton;
