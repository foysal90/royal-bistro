import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2'

const CheckMeOut = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [cart] = useCart();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState('');

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = parseFloat(total.toFixed(2));

  useEffect(() => {
    if (total > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice,total]);
  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      //console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }
    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymouse",
            email: user?.email || "anonymouse",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError);
    }
    console.log(paymentIntent);
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id)
        //save payment info to the server
        const payment = {
            email: user?.email,
            name: user?.displayName,
            transactionId: paymentIntent.id,
            totalPrice,
            quantity: cart.length,
            items: cart.map(item => item._id),
            itemNames: cart.map(item => item.name),
            
        }
        axiosSecure.post('/payment', payment)
        .then(res => {
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: 'Sweet !!',
                    text: `Transaction complete, Transaction Id: ${transactionId}`,
                    showConfirmButton: false,
                    timer: 1500
                  });
    
                
            }
        })
       
      
    }
  };
  return (
    <form onSubmit={handlePayment}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <p className="text-red-600">{cardError}</p>
      
      <button
        className="btn btn-primary btn-sm"
        type="submit"
        disabled={!stripe || !clientSecret || processing}
      >
        Pay
      </button>
    </form>
  );
};

export default CheckMeOut;

