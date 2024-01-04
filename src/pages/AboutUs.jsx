import React from "react";
import "./AboutUs.css";
import { useTranslation } from "react-i18next";


export const AboutUs = () => {
  const {t} = useTranslation("global");

  const statsData = [
    { number: "4", text: t("aboutUs.paragraph1") },
    { number: "1", text: t("aboutUs.paragraph2") },
    { number: "100+", text: t("aboutUs.paragraph3") },
    { number: "0", text: t("aboutUs.paragraph4") },
  ];

  return (
    <div className="about-us-container">
      <h1>{t("aboutUs.title")}</h1>
      <p>{t("aboutUs.paragraph")}</p>

      <div className="about-us-stats">
        {statsData.map((stat, index) => (
          <div className="about-us-stat" key={index}>
            <h2>{stat.number}</h2>
            <p>{stat.text}</p>
          </div>
        ))}
      </div>

      <p>{t("aboutUs.paragraph5")}</p>

      {["title2", "title3"].map((titleKey, index) => (
        <React.Fragment key={index}>
          <h2>{t(`aboutUs.${titleKey}`)}</h2>
          <p>{t(`aboutUs.paragraph${index + 6}`)}</p>
          <br />
          <br />
        </React.Fragment>
      ))}
    </div>
  );
};

export default AboutUs;