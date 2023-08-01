import "./payment.css";
import { Navigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

export default function Payment({ token }) {
  const location = useLocation();

  console.log("token payment =>", token);

  const stripePromise = loadStripe(
    "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
  );
  return token ? (
    <Elements stripe={stripePromise}>
      <CheckoutForm paymentInfos={location.state} />
    </Elements>
  ) : (
    <Navigate to="/login" state={{ from: "/payment" }} />
  );
}
