import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckMeOut = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [cart, refetch] = useCart();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();
  //const [transactionId, setTransactionId] = useState('');

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
  }, [axiosSecure, totalPrice, total]);
  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error } = await stripe.createPaymentMethod({
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
      //setTransactionId(paymentIntent.id)
      //save payment info to the server
      const payment = {
        email: user?.email,
        name: user?.displayName,
        transactionId: paymentIntent.id,
        totalPrice,
        date: new Date(),
        quantity: cart.length,
        cartItemsId: cart.map((item) => item._id),
        menuItemId: cart.map((item) => item.menuItem),
        status: "processing",
        itemNames: cart.map((item) => item.name),
      };
      axiosSecure.post("/payments", payment).then((res) => {
        console.log(res.data);
        if (res.data.result) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Sweet !!",
            text: `Transaction complete, Transaction Id: ${paymentIntent.id}`,
            showConfirmButton: false,
            timer: 1500,
           
          });
          navigate('/dashboard/orderConfirm')
        }
      });
    }
  };
  return (
    <div className="w-96 px-5 py-2 rounded-xl shadow-2xl  bg-blue-900 h-64">
      <div className="text-center ">
        <h1 className="text-center text-sm font-semibold uppercase text-white mb-5 ">
          Please enter your card details below
        </h1>
        <form onSubmit={handlePayment}>
          <CardElement className="bg-white shadow-2xl p-2 mb-5 border-white border shadow-white" />
          <p className="text-red-600">{cardError}</p>

          <button
            className="btn bg-[#d1a054] hover:bg-[#d09b4b] btn-sm w-1/2 "
            type="submit"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckMeOut;

// options={{
//     style: {
//       base: {
//         fontSize: '16px',
//         color: '#424770',
//         '::placeholder': {
//           color: '#aab7c4',
//         },
//       },
//       invalid: {
//         color: '#9e2146',
//       },
//     },
//   }}
