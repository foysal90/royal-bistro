import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../../../components/CheckOut/CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
  return (
    <div>
      <SectionTitle heading={"payment"} subHeading={"Pay Here"}></SectionTitle>
      <h1 className="text-center text-2xl font-semibold text-teal-300 mb-20">Please enter your card details below</h1>

      <Elements stripe={stripePromise}>
        <CheckOutForm/>
      </Elements>
    </div>
  );
};

export default Payment;
