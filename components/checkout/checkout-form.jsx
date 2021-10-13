import { useState } from "react";
import { useRouter } from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Portal from "../ui/portal";
import Spinner from "../ui/spinner";
import Button from "../ui/button";

function CheckoutForm(props) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");

  async function confrimPayment(orderId, paymentId) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
          body: JSON.stringify({
            orderId,
            paymentId,
          }),
        }
      );

      const data = await res.json();
      if (data.status === "SUCCEEDED") {
        props.clearCartAndOrderInfo();
        router.push("/checkout-success");
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(props.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      confrimPayment(props.orderId, payload.paymentIntent.id);
      setProcessing(false);
    }
  };

  return (
    <div>
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <Button type="submit">Pay now</Button>
        {error && <p className="mt-2 text-red-600">{error}</p>}
      </form>
      {processing && (
        <Portal>
          <Spinner />
        </Portal>
      )}
    </div>
  );
}

export default CheckoutForm;
