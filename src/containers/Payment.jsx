import React, { useContext } from 'react';
import { PayPalButton } from 'react-paypal-button';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../styles/components/Payment.css';

const Payment = () => {
  const { state, addNewOrder } = useContext(AppContext);
  const { cart, buyer } = state;
  const history = useHistory();

  const paypalOtions = {
    clientId:
      'ATN4MgsCVKSXinkSTL1YqlANTikW5fXyo5C7TkyVUG7JB0DTr1G2aabkWFF9Uz6kKo61tL48cfWpomc4',
    intent: 'capture',
    currency: 'USD',
  };

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect',
  };

  const handlePaymentSuccess = (data) => {
    console.log(data);
    if (data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        product: cart,
        payment: data,
      };
      addNewOrder(newOrder);
      history.push('/checkout/success');
    }
  };

  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  };

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resument del pedido:</h3>
        {cart.map((item) => (
          <div className="Payment-item" key={item.title}>
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>$ {item.price}</span>
            </div>
          </div>
        ))}
        <div className="Payment-button">
          <PayPalButton
            paypalOptions={paypalOtions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal()}
            onPaymentStart={() => console.log('Start Payment')}
            onPaymentSuccess={(data) => handlePaymentSuccess(data)}
            onPaymentError={(error) => console.log(error)}
            onPaymentCancel={(data) => console.log(data)}
          />
        </div>
      </div>
      <div />
    </div>
  );
};

export default Payment;
