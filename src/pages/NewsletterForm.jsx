// import React, { useState } from "react";
// import "./NewsletterForm.css";

// export const NewsletterForm = () => {
//   const [email, setEmail] = useState("");
//   const [subscribed, setSubscribed] = useState(false);

//   const handleSubscribe = (e) => {
//     e.preventDefault();
//     //kod obsługujący subskrypcję, na przykład wysyłając żądanie do API lub innej usługi backendowej.
//     setSubscribed(true);
//   };

//   return (
//     <div className="newsletter-form">
//       <h2>Subskrybuj nasz newsletter</h2>
//       {subscribed ? (
//         <p>Dziękujemy za subskrypcję naszego newslettera!</p>
//       ) : (
//         <form onSubmit={handleSubscribe}>
//           <input
//             type="email"
//             placeholder="Twój adres email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <button type="submit">Subskrybuj</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default NewsletterForm;


import React, { useState } from "react";
import "./NewsletterForm.css";
import { useTranslation } from "react-i18next";

export const NewsletterForm = () => {
  const {t} = useTranslation("global");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // W przyszlosci kod obsługujący subskrypcję, na przykład wysyłając żądanie do API lub innej usługi backendowej.

    setSubscribed(true);
  };

  return (
    <div className="newsletter-form">
      <h2 className="form-title">{t("newsletter.title")}</h2>
      {subscribed ? (
        <p className="success-message">{t("newsletter.paragraph")}</p>
      ) : (
        <form onSubmit={handleSubscribe}>
          <input
            type="email"
            className="input-field"
            placeholder={t("newsletter.placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="subscribe-button">{t("newsletter.button")}</button>
        </form>
      )}
    </div>
  );
};

export default NewsletterForm;
