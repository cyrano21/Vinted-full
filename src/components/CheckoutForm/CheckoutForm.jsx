import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ paymentInfos }) => {
  const [confirmMessage, setConfirmMessage] = useState("");

  const { amount, title } = paymentInfos;
  console.log("title", title);
  const elements = useElements();
  const stripe = useStripe();
  return confirmMessage ? (
    <p>
      Achat de{" "}
      {(Math.round((paymentInfos.amount + 1.2) * 100) / 100).toFixed(2)} €
      effectué !
    </p>
  ) : (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const cardElement = elements.getElement(CardElement);

        const stripeToken = await stripe.createToken(cardElement, {
          name: paymentInfos.ownerID,
        });
        console.log("stripeToken =>", stripeToken);
        try {
          const response = await axios.post(
            "https://lereacteur-vinted-api.herokuapp.com/payment",
            {
              token: stripeToken.token.id,

              title: title,
              amount: Math.round((paymentInfos.amount + 1.2) * 100) / 100,
            }
          );
          console.log("reponse back après payment => ", response.data);
          if (response.data.status === "succeeded") {
            setConfirmMessage("Félicitations pour votre achat !");
          } else {
            setConfirmMessage("");
          }
        } catch (error) {
          console.log("error request =>", error.response);
        }
      }}
    >
      <p>{`Vous allez payer ${(
        Math.round((paymentInfos.amount + 1.2) * 100) / 100
      ).toFixed(2)} € :`}</p>
      <CardElement />
      <button>Pay</button>
    </form>
  );
};

export default CheckoutForm;
