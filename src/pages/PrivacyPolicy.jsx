import React from "react";
import "./PrivacyPolicy.css"; 
import { useTranslation } from "react-i18next";

export const PrivacyPolicy = () => {
  const { t } = useTranslation("global");


  return (
    <div className="privacy-policy-container">
      <h1 className="policy-title">{t("privacyPolicy.title")}</h1>

      <section className="policy-section">
        <h2 className="section-title">{t("privacyPolicy.section1Title")}</h2>
        <p>{t("privacyPolicy.section1Paragraph")}</p>
      </section>

      <section className="policy-section">
        <h2 className="section-title">{t("privacyPolicy.section2Title")}</h2>
        <p>{t("privacyPolicy.section2Paragraph")}</p>
      </section>

      <section className="policy-section">
        <h2 className="section-title">{t("privacyPolicy.section3Title")}</h2>
        <p>{t("privacyPolicy.section3Paragraph")}</p>
      </section>

      <section className="policy-section">
        <h2 className="section-title">{t("privacyPolicy.section4Title")}</h2>
        <p>{t("privacyPolicy.section4Paragraph")}</p>
      </section>

      <section className="policy-section">
        <h2 className="section-title">{t("privacyPolicy.section5Title")}</h2>
        <p>{t("privacyPolicy.section5Paragraph")}</p>
      </section>

      <section className="policy-section">
        <h2 className="section-title">{t("privacyPolicy.section6Title")}</h2>
        <p>{t("privacyPolicy.section6Paragraph")}</p>
      </section>

      <section className="policy-section">
        <h2 className="section-title">{t("privacyPolicy.section7Title")}</h2>
        <p>{t("privacyPolicy.section7Paragraph")}</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
