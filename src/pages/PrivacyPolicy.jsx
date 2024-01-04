import React from "react";
import "./PrivacyPolicy.css"; 
import { useTranslation } from "react-i18next";

export const PrivacyPolicy = () => {
  const { t } = useTranslation("global");

  const sections = [
    { title: t("privacyPolicy.section1Title"), content: t("privacyPolicy.section1Paragraph") },
    { title: t("privacyPolicy.section2Title"), content: t("privacyPolicy.section2Paragraph") },
    { title: t("privacyPolicy.section3Title"), content: t("privacyPolicy.section3Paragraph") },
    { title: t("privacyPolicy.section4Title"), content: t("privacyPolicy.section4Paragraph") },
    { title: t("privacyPolicy.section5Title"), content: t("privacyPolicy.section5Paragraph") },
    { title: t("privacyPolicy.section6Title"), content: t("privacyPolicy.section6Paragraph") },
    { title: t("privacyPolicy.section7Title"), content: t("privacyPolicy.section7Paragraph") },
  ];

  return (
    <div className="privacy-policy-container">
      <h1 className="policy-title">{t("privacyPolicy.title")}</h1>
      {sections.map((section, index) => (
        <section key={index} className={`policy-section section-${index + 1}`}>
          <h2 className="section-title">{section.title}</h2>
          <p>{section.content}</p>
        </section>
      ))}
    </div>
  );
};

export default PrivacyPolicy;


