import React, { useState } from "react";
import { useRouter } from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

function CheckoutForm(props) {
  const router = useRouter();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const stripe = useStripe();
  const elements = useElements();

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
    setDisabled(event.empty);
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
      setProcessing(false);
      setSucceeded(true);
      confrimPayment(props.orderId, payload.paymentIntent.id);
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
        <button disabled={processing || disabled || succeeded}>
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay Now"
            )}
          </span>
        </button>
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment succeeded, see the result in your
          <a href="https://dashboard.stripe.com/test/payments">
            {" "}
            Stripe dashboard.
          </a>{" "}
          Refresh the page tp pay again
        </p>
      </form>
    </div>
  );
}

export default CheckoutForm;
