import React, { useState } from 'react';
import './Payment.css'; // Ensure this path matches the location of your CSS file

export const Payment = () => {
  const [deliveryMethod, setDeliveryMethod] = useState('courier');
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    zip: '',
  });

  const handleDeliveryChange = (event) => {
    setDeliveryMethod(event.target.value);
  };

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress({
      ...address,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would handle the form submission
    console.log(`Delivery Method: ${deliveryMethod}, Payment Method: ${paymentMethod}, Address:`, address);
  };

  return (
    <div>
      <h1 id="H1">Delivery and Payment</h1>
      <h2 class= "H2"> Adress</h2>
      <form onSubmit={handleSubmit}>
        {/* Address Section */}
        <div className="delivery">
            <input className="deliveryinput"
              type="text"
              name="name"
              value={address.name}
              onChange={handleAddressChange}
            />
        </div>
        <div>
            <input
              type="text"
              name="street"
              
              onChange={handleAddressChange}
              className="deliveryinput"
            />
        </div>
        <div>
            <input
              type="text"
              name="city"
              
              onChange={handleAddressChange}
              className="deliveryinput"
            />
          </div>
          <div>
            <input
              type="text"
              name="zip"
              value={address.zip}
              onChange={handleAddressChange}
              className="deliveryinput"
            />
        </div>
        {/* Delivery Options Section */}
        <h2 className='H2'>Delivery Options</h2>
        <div className="deliveryinput">
          
          
            <input
              
              type="radio"
              name="deliveryMethod"
              value="courier"
              checked={deliveryMethod === 'courier'}
              onChange={handleDeliveryChange}
            />
            Courier
        </div>
        <div className="deliveryinput">
            
          
            <input
              type="radio"
              name="deliveryMethod"
              value="inStore"
              checked={deliveryMethod === 'inStore'}
              onChange={handleDeliveryChange}
            />
            In-Store Pickup
          
          {/* Add additional delivery methods here */}
        </div>
        <div className="deliveryinput">
            
          
            <input
              type="radio"
              name="deliveryMethod"
              value="Ixdex"
              checked={deliveryMethod === 'Ixdex'}
              onChange={handleDeliveryChange}
            />
            Ixdex
          
          {/* Add additional delivery methods here */}
        </div>

        {/* Payment Options Section */}
        <h2 className='H2'>Payment Options</h2>
        <div className="deliveryinput">
         
       
            <input
              type="radio"
              name="paymentMethod"
              value="online"
              checked={paymentMethod === 'online'}
              onChange={handlePaymentChange}
            />
            Online Payment
          
          
          </div> 
          <div className='deliveryinput'>
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={paymentMethod === 'creditCard'}
              onChange={handlePaymentChange}
            />
            Credit Card
         
          {/* Add additional payment methods here */}
        </div>
        <div className='deliveryinput'>
            <input
              type="radio"
              name="paymentMethod"
              value="blik"
              checked={paymentMethod === 'blik'}
              onChange={handlePaymentChange}
            />
            BLIK
         
          {/* Add additional payment methods here */}
        </div>
        <h2 className='H2'>You buying as</h2>
        <h2 className='H2'>Biling information</h2>
        <h2 className='H2'>Agreemets</h2>

        <button type="submit" className="paybutt">
          Proceed to Payment
        </button>
      </form>
      
    </div>
  );
};

export default Payment;
