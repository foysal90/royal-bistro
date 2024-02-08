import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckOut = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState('')

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return
      
    }

    //checking payment card 
    const card = elements.getElement(CardElement);
    if (card === null) {
      return
      
    }

   const {error, paymentMethod} = await stripe.createPaymentMethod({
    type: 'card',
    card,
   })
   if (error) {
    setCardError(error.message)
    
   } else {
    setCardError('')
    console.log('payment', paymentMethod)
    
   }
  }
  return (
    <div className='bg-base-200  p-20 m-20 rounded-lg shadow-2xl shadow-white'>
      <form onSubmit={handlePayment}>
        <CardElement
        className='bg-base-100 text-blue-400'
          
        />
       {cardError &&  <span className='text-red-600'>{cardError}</span>}
        <div className='text-center mt-10 '>
        <button type="submit" disabled={!stripe} className='bg-teal-400 hover:bg-teal-300 w-1/6 p-1 rounded-lg '>
          Pay
        </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOut;
