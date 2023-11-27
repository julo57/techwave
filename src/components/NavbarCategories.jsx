import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavbarCategories.css"; 
import { useTranslation } from "react-i18next";

      
export const NavbarCategories = (props) => {
  const {t} = useTranslation("global");

  return (
    <div className="navbar-categories">
      <Link  className="navbar-category-link" onClick={()=>{
        props.setSelectedCategory("");
      }}>
        {t("navbarCategories.link")}
      </Link>
      <Link className="navbar-category-link" onClick={()=>{
        props.setSelectedCategory("Phone");
      }}>
        {t("navbarCategories.link2")}
      </Link>
        <Link  className="navbar-category-link" onClick={()=>{
        props.setSelectedCategory("Laptop");
      }}>
       {t("navbarCategories.link3")}
      </Link>
      <Link className="navbar-category-link" onClick={()=>{
        // console.log("clicked TV");
        props.setSelectedCategory("TV");
      }}>
        {t("navbarCategories.link4")}
      </Link>
    </div>
  );
};

export default NavbarCategories;
