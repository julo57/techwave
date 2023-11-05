import React, { useState } from "react";
import "./FAQ.css";
import { useTranslation } from "react-i18next";

export const FAQ = () => {
  const { t } = useTranslation("global");

  const faqData = [
    {
      question: t("FAQ.question"), // Updated translation key
      answer: t("FAQ.answer"),
    },
    {
      question: t("FAQ.question2"), // Updated translation key
      answer: t("FAQ.answer2"),
    },
    {
      question: t("FAQ.question3"), // Updated translation key
      answer: t("FAQ.answer3"),
    },
    {
      question: t("FAQ.question4"), // Updated translation key
      answer: t("FAQ.answer4"),
    },
    {
      question: t("FAQ.question5"), // Updated translation key
      answer: t("FAQ.answer5"),
    },
    {
      question: t("FAQ.question6"), // Updated translation key
      answer: t("FAQ.answer6"),
    },
    {
      question: t("FAQ.question7"), // Updated translation key
      answer: t("FAQ.answer7"),
    },
    {
      question: t("FAQ.question8"), // Updated translation key
      answer: t("FAQ.answer8"),
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggleAnswer = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
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


