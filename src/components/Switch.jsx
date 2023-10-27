import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

function Switch() {
  const [isSelected, setIsSelected] = useState(false);

  const handleToggle = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      onClick={handleToggle}
      className={`relative w-20 h-10 m-0 rounded-full ${
        isSelected ? "bg-yellow-500" : "bg-gray-700"
      }`}
    >
      <span
        className={`absolute h-10 w-10 rounded-full ${
          isSelected ? "bg-yellow-700" : "bg-black"
        }`}
        style={{
          transition: "0.4s",
          left: isSelected ? "calc(100% - 2.25rem)" : "0rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isSelected ? (
          <FontAwesomeIcon icon={faSun} color="yellow" style={{ fontSize: "1rem" }} />
        ) : (
          <FontAwesomeIcon icon={faMoon} color="white" style={{ fontSize: "1rem" }} />
        )}
      </span>
    </div>
  );
}

export default Switch;
