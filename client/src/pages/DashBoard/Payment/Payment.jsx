import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";

import { Helmet } from "react-helmet-async";
import CheckMeOut from "./CheckMeOut";
//import useCart from "../../../hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
  
  //const price = total.toFixed(2);
  return (
    <div>
      <Helmet>
        <title>Toh | Payment</title>
      </Helmet>
      <SectionTitle heading={"payment"} subHeading={"Pay Here"}></SectionTitle>
      <h1 className="text-center text-2xl font-semibold text-teal-300 mb-20">
        Please enter your card details below
      </h1>

      <Elements stripe={stripePromise}>
        {/* props must like server */}
        <CheckMeOut  />
      </Elements>
    </div>
  );
};

export default Payment;
