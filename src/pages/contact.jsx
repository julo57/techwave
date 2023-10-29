
import React, { useState } from "react";
import "./contact.css";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log("Email został wysłany pomyślnie!");
        // logika, która ma być wykonana po pomyślnym wysłaniu emaila.
      } else {
        console.error("Wystąpił błąd podczas wysyłania emaila.");
      }
    } catch (error) {
      console.error("Wystąpił błąd:", error);
    }
  
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };


  return (
    <div className="contact-container">
      <h1>Kontakt</h1>
      <p>
        Adres siedziby: Prószkowska 76, 45-758 Opole
        <br />
        Telefon: +12 345 678 910
        <br />
        Email: kontakt@techwave.com
      </p>
      <p>Godziny otwarcia siedziby: Poniedziałek - Piątek: 9:00 - 18:00, Sobota: 10:00 - 14:00</p>
      <div className="map-container">
        {/* kod interaktywnej mapy Google */}
      </div>
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="name"
            placeholder="Imię"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="message"
            placeholder="Wiadomość"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Wyślij</button>
        </form>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2127.0844901228!2d17.902945889562098!3d50.654159217681986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471053bb1bcdafab%3A0xf2ef41915344d5dd!2sPolitechnika%20Opolska!5e0!3m2!1spl!2spl!4v1698527016069!5m2!1spl!2spl"
        width="100%" height="400" title="Google Maps"
        style={{ border: 0 }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Contact;
