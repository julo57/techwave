import React, { useState } from "react";
import "./FAQ.css";
import { useTranslation } from "react-i18next";

export const FAQ = () => {
  const { t } = useTranslation("global");

  const faqData = [
    t("FAQ.question"),
    t("FAQ.question2"),
    t("FAQ.question3"),
    t("FAQ.question4"),
    t("FAQ.question5"),
    t("FAQ.question6"),
    t("FAQ.question7"),
    t("FAQ.question8"),
  ].map((question, index) => ({
    question,
    answer: t(`FAQ.answer${index + 1}`), 
  }));

  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggleAnswer = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="faq-container">
      <h1>{t("FAQ.title")}</h1>
      {faqData.map((item, index) => (
        <div className="faq-item" key={index}>
          <div className="question" onClick={() => handleToggleAnswer(index)}>
            <h2>{item.question}</h2>
            {activeIndex === index ? <span>&#9660;</span> : <span>&#9654;</span>}
          </div>
          {activeIndex === index && <p className="answer">{item.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
