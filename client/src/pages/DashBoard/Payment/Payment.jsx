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
    <div className="">
      <Helmet>
        <title>Royal | Payment</title>
      </Helmet>
      <SectionTitle heading={"payment"} subHeading={"Pay Here"}></SectionTitle>

      <div className="w-96 m-auto">
        <Elements stripe={stripePromise}>
          {/* props must like server */}
          <CheckMeOut />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
