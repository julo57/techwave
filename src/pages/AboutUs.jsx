import React from "react";
import "./AboutUs.css";
import { useTranslation } from "react-i18next";


export const AboutUs = () => {
  const {t} = useTranslation("global");


  return (
    
    <div className="about-us-container">
      <h1>{t("aboutUs.title")}</h1> 
      <p>{t("aboutUs.paragraph")}</p>

      <div className="about-us-stats">
        <div className="about-us-stat">
          <h2>4</h2>
          <p>{t("aboutUs.paragraph1")}</p>
        </div>
        <div className="about-us-stat">
          <h2>1</h2>
          <p>{t("aboutUs.paragraph2")}</p>
        </div>
        <div className="about-us-stat">
          <h2>100+</h2>
          <p>{t("aboutUs.paragraph3")}</p>
        </div>
        <div className="about-us-stat">
          <h2>0</h2>
          <p>{t("aboutUs.paragraph4")}</p>
        </div>
      </div>

      <p>{t("aboutUs.paragraph5")}</p>

      <h2>{t("aboutUs.title2")}</h2>
      <p>{t("aboutUs.paragraph6")}</p>

      <h2>{t("aboutUs.title3")}</h2>
     <p>{t("aboutUs.paragraph7")}</p>
      <br />
      <br />
    </div>
  );
};

export default AboutUs;
