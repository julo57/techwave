
import React, { useState } from "react";
import "./Statute.css";
import { useTranslation } from "react-i18next";
import jsPDF from "jspdf";

export const Statute = () => {
  const { t } = useTranslation("global");
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      title: t("statute.section1Title"),
      content: t("statute.section1Content"),
    },
    {
      title: t("statute.section2Title"),
      content: t("statute.section2Content"),
    },
    {
      title: t("statute.section3Title"),
      content: t("statute.section3Content"),
    },
    {
      title: t("statute.section4Title"),
      content: t("statute.section4Content"),
    },
    {
      title: t("statute.section5Title"),
      content: t("statute.section5Content"),
    },
    {
      title: t("statute.section6Title"),
      content: t("statute.section6Content"),
    },
    {
      title: t("statute.section7Title"),
      content: t("statute.section7Content"),
    },
    {
      title: t("statute.section8Title"),
      content: t("statute.section8Content"),
    },
  ];

  
  return (
    <div className="regulamin-container">
      <h1>{t("statute.title")}</h1>
      <br />
      {sections.map((section, index) => (
        <div className="regulamin-section" key={index}>
          <h2
            className={`section-title ${activeSection === index ? "active" : ""}`}
            onClick={() => setActiveSection(index)}
          >
            {section.title}
          </h2>
          <p className={`regulamin-content ${activeSection === index ? "show" : ""}`}>
            {section.content.split('\n').map((paragraph, i) => (
              <span key={i}>
                {paragraph}
                <br />
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Statute;
