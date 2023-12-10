import React, { useState,useEffect, useContext } from 'react';
import { ShopContext } from '../../context/shop-context';
import { PaymentContext } from '../../context/PaymentContext';
import './Payment.css'; // Ensure this path matches the location of your CSS file
import { useNavigate } from 'react-router-dom';
export const Payment = () => {
  const { cartItems, getTotalCartAmount} = useContext(ShopContext);
  const { paymentDetails, updatePaymentDetails } = useContext(PaymentContext);
  
  const totalAmount = getTotalCartAmount();
  const [promoCode, setPromoCode] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('courier');
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [privateMethod, setPrivateMethod] = useState('company');
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isNewsletterChecked, setIsNewsletterChecked] = useState(false);
  const [deliveryCost, setDeliveryCost] = useState(20);
 
  const navigate = useNavigate();
  
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    zip: '',
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  const handleDeliveryChange = (event) => {
    setDeliveryMethod(event.target.value);
    // Update delivery cost based on selection
    if (event.target.value === 'courier') {
      setDeliveryCost(20); // Cost for courier
    } else {
      setDeliveryCost(0); // No extra cost for other methods
    }
  };
  
  const handleApplyPromoCode = () => {
    applyPromoCode(promoCode);
  };

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePrivateMethodChange = (event) => {
    setPrivateMethod(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress({
      ...address,
      [event.target.name]: event.target.value,
    });
  };

  const handleNewsletterChange = (event) => {
    setIsNewsletterChecked(event.target.checked);
  };
  
  // Obliczanie całkowitej kwoty do zapłaty przy wyświetlaniu
  const calculateTotalWithDiscount = () => {
    if (isNewsletterChecked) {
      return getTotalCartAmount()* 0.95 + deliveryCost; // 5% rabatu
    }
    return getTotalCartAmount() + deliveryCost; // Brak rabatu
  };
  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  
  const handleTermsChange = (event) => {
    setIsTermsChecked(event.target.checked);
    
  };
  const handleTermsChange2 = (event) => {
    
    setIsNewsletterChecked(event.target.checked);
  };
  const validateForm = () => {
    const newErrors = {};
    if (!address.name.trim()) newErrors.name = 'Name is required';
    if (!address.street.trim()) newErrors.street = 'Street is required';
    if (!address.city.trim()) newErrors.city = 'City is required';
    if (!address.zip.trim()) newErrors.zip = 'ZIP code is required';
    if (!isTermsChecked) newErrors.terms = 'You must agree to the terms and conditions';
    // Add other validations as needed
    const zipCodeRegex = /^\d{2}-\d{3}$/;
    if (!zipCodeRegex.test(address.zip)) newErrors.zip = 'ZIP code must be in the format **-***';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
   
  useEffect(() => {
    if (Object.keys(cartItems).length === 0) {
      navigate('/'); // Przekierowanie do strony głównej, gdy koszyk jest pusty
    }
  }, [cartItems, navigate]);
  
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      updatePaymentDetails({
        deliveryMethod,
        paymentMethod,
        address,
        promoCode,
        newsletterSubscription: isNewsletterChecked,
        termsAgreement: isTermsChecked,
        discountRate: paymentDetails.discountRate
      });

      if (paymentMethod === 'blik') {
        navigate('/Summation');
      } else {
        
        navigate('/Summation');
      }
    }
  };
  return (
    <div className="container-payment">
      <div className="form-section">
        <h1 id="H11">Delivery and Payment</h1>
        <form className='payment-form' onSubmit={handleSubmit}>
          <h2 className="H2">Address</h2>
          <div className="delivery">
            <input type="text" name="name" placeholder="Name" value={address.name} onChange={handleAddressChange} className="deliveryinput" />
            {errors.name && <p className="error-message">{errors.name}</p>}
            <input type="text" name="street" placeholder="Street" value={address.street} onChange={handleAddressChange} className="deliveryinput" />
            {errors.street && <p className="error-message">{errors.street}</p>}
            <input type="text" name="city" placeholder="City" value={address.city} onChange={handleAddressChange} className="deliveryinput" />
            {errors.city && <p className="error-message">{errors.city}</p>}
            <input type="text" name="zip" placeholder="ZIP Code 46-113" value={address.zip} onChange={handleAddressChange} className="deliveryinput" />
            {errors.zip && <p className="error-message">{errors.zip}</p>}
          </div>
  
          <h2 className="H2">Delivery Options</h2>
          <div className="deliverydiv">
            <div className="deliveryinputradio">
              <input type="radio" id="courier" name="deliveryMethod" value="courier" checked={deliveryMethod === 'courier'} onChange={handleDeliveryChange} />
              <label htmlFor="courier">Courier</label>
            </div>
            <div className="deliveryinputradio">
              <input type="radio" id="inStore" name="deliveryMethod" value="inStore" checked={deliveryMethod === 'inStore'} onChange={handleDeliveryChange} />
              <label htmlFor="inStore">In-Store Pickup</label>
            </div>
            <div className="deliveryinputradio">
              <input type="radio" id="idex" name="deliveryMethod" value="idex" checked={deliveryMethod === 'idex'} onChange={handleDeliveryChange} />
              <label htmlFor="idex">Idex</label>
            </div>
          </div>
  
          <h2 className="H2">Payment Options</h2>
          <div className="deliverydiv">
            <div className="deliveryinputradio">
              <input type="radio" id="online" name="paymentMethod" value="online" checked={paymentMethod === 'online'} onChange={handlePaymentChange} />
              <label htmlFor="online">Online Payment</label>
            </div>
            <div className="deliveryinputradio">
              <input type="radio" id="creditCard" name="paymentMethod" value="creditCard" checked={paymentMethod === 'creditCard'} onChange={handlePaymentChange} />
              <label htmlFor="creditCard">Credit Card</label>
            </div>
            <div className="deliveryinputradio">
              <input type="radio" id="blik" name="paymentMethod" value="blik" checked={paymentMethod === 'blik'} onChange={handlePaymentChange} />
              <label htmlFor="blik">BLIK</label>
            </div>
          </div>
  
          <h2 className="H2">You are buying as</h2>
          <div className="deliverydiv">
            <div className="deliveryinputradio">
              <input type="radio" id="company" name="privateMethod" value="company" checked={privateMethod === 'company'} onChange={handlePrivateMethodChange} />
              <label htmlFor="company">Company</label>
            </div>
            <div className="deliveryinputradio">
              <input type="radio" id="privatePerson" name="privateMethod" value="privatePerson" checked={privateMethod === 'privatePerson'} onChange={handlePrivateMethodChange} />
              <label htmlFor="privatePerson">Private Person</label>
            </div>
          </div>
  
          <h2 className="H2">Billing Information</h2>
          <div className="deliverycheckbox">
            <div>
              <input type="checkbox" name="termsConditions" checked={isTermsChecked} onChange={handleTermsChange} />
              <label>I agree to the Terms and Conditions</label>
              {errors.terms && <p className="error-message">{errors.terms}</p>}
            </div>
            <div>
                <input type="checkbox" name="Newsletter" checked={isNewsletterChecked} onChange={handleNewsletterChange} />
                <label>I agree to the newsletter</label>
             </div>
        </div>
  
          
        </form>
      </div>
  
      <div className="checkout-summary">
        <ul className="checkout-items">
          {Object.values(cartItems).map((item, index) => (
            <li key={index}>
              {item.name} - {item.price} zł x {item.quantity}
              <img src={item.photo} alt={item.name} className="item-photo" />
            </li>
          ))}
        </ul>
        <div className="promo-code">
          <input
            type="text"
            value={promoCode}
            onChange={handlePromoCodeChange}
            placeholder="Masz kod promocyjny?"
          />
          <button onClick={handleApplyPromoCode}>Zastosuj</button>
        </div>
        <div className="total-amount">
          <p>Koszyk: {totalAmount} zł</p>
          <p>Dostawa {deliveryCost} zł</p>
          <p>Rabat: {isNewsletterChecked ? '5%' : '0%'}</p>
          <p>Do zapłaty: {calculateTotalWithDiscount()}  zł</p>
        </div>
        <form onSubmit={handleSubmit} >
        <button type="submit" className="paybutt"  >Proceed to Payment</button>
        </form>
      
    </div>
    
  </div>
  );
          };

export default Payment;
