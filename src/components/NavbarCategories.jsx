import React from "react";
import "./NavbarCategories.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const NavbarCategories = (props) => {
  const { t } = useTranslation("global");
  const navigate = useNavigate();

  return (
    <div className="navbar-categories">
      <span
        className="navbar-category-link"
        onClick={() => {
          props.setSelectedCategory("");
        }}
      >
        {t("navbarCategories.link")}
      </span>
      <span
        className="navbar-category-link"
        onClick={() => {
          navigate("/");
          console.log("phone");
          props.setSelectedCategory("Phone");
        }}
      >
        {t("navbarCategories.link2")}
      </span>
      <span
        className="navbar-category-link"
        onClick={() => {
          navigate("/");
          props.setSelectedCategory("Laptop");
        }}
      >
        {t("navbarCategories.link3")}
      </span>
      <span
        className="navbar-category-link"
        onClick={() => {
          navigate("/");
          props.setSelectedCategory("TV");
        }}
      >
        {t("navbarCategories.link4")}
      </span>
    </div>
  );
};

export default NavbarCategories;