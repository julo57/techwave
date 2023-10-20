import React, { useState } from "react";
import "./FAQ.css";

export const FAQ = () => {
  const faqData = [
    {
      question: "Jak złożyć zamówienie?",
      answer: "Aby złożyć zamówienie, przejdź do naszego katalogu produktów, wybierz interesujące Cię produkty, dodaj je do koszyka, a następnie przejdź do kasy i dokonaj płatności.",
    },
    {
      question: "Jak mogę sprawdzić status mojego zamówienia?",
      answer: "Możesz sprawdzić status swojego zamówienia, logując się na swoje konto na naszej stronie i przechodząc do sekcji Historia Zamówień.",
    },
    {
      question: "Czy oferujecie darmową dostawę?",
      answer: "Tak, oferujemy darmową dostawę dla zamówień powyżej 200 złotych.",
    },
    {
      question: "Jak mogę zwrócić produkt?",
      answer: "Aby zwrócić produkt, skontaktuj się z naszym działem obsługi klienta, a my przewodniczymy Ci przez proces zwrotu.",
    },
    {
       question: "Czy można zmienić adres dostawy po złożeniu zamówienia?",
       answer: "Tak, możesz zmienić adres dostawy przed wysyłką zamówienia. Skontaktuj się z nami, aby dokonać zmian.",
    },
    {
       question: "Ile czasu trwa dostawa?",
       answer: "Czas dostawy zależy od Twojej lokalizacji. W większości przypadków dostawa trwa od 2 do 5 dni roboczych.",
    },
    {
       question: "Czy można śledzić przesyłkę?",
       answer: "Tak, po wysłaniu zamówienia otrzymasz numer śledzenia, który możesz użyć do monitorowania statusu przesyłki.",
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
      <h1>Pytania i Odpowiedzi</h1>
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