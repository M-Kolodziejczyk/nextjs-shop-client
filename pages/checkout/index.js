import React, { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";

import CheckoutForm from "../../components/checkout/checkout-form";

import CartContext from "../../store/cart-context";

function CheckoutPage(props) {
  const [products, setProducts] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const router = useRouter();
  const cartCtx = useContext(CartContext);
  const cart = cartCtx.state.cart;
  const orderInfo = cartCtx.state.orderInformation;
  console.log("CART: ", cart);

  useEffect(async () => {
    if (cart.length === 0) {
      router.push("/cart");
    } else {
      const orderData = {
        email: props.session.user.email,
        name: orderInfo.name,
        address: orderInfo.address,
        city: orderInfo.city,
        products: cart,
      };

      const createOrder = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${props.session.jwt}`,
            },
            body: JSON.stringify(orderData),
          }
        );

        const data = await response.json();
        console.log("DATA: ", data);
        setProducts(data.availableProducts);
        setClientSecret(data.clientSecret);
        setOrderId(data.id);
      };

      createOrder();
    }
  }, []);

  const promise = loadStripe(
    "pk_test_51HwVilIT5kXxcCpHU34AGuIjYmXG9dBwhuLmA2nMOEs9qkqVNNXRDHHUJF22ctEawAZFUVsV6t6i1sgMHuzFnygD00jzGSqetL"
  );

  return (
    <div>
      <h1 className="mb-5">Checkout Page</h1>
      {products.length > 0 && (
        <div>
          {products.map((product) => (
            <div key={product.id} className="border">
              <p>Name: {product.name}</p>
              <p>Brand: {product.brand}</p>
              <p>Price: {product.price}</p>
            </div>
          ))}
          <div className="mt-5">
            <Elements stripe={promise}>
              <CheckoutForm
                token={props.session.jwt}
                orderId={orderId}
                clientSecret={clientSecret}
                clearCartAndOrderInfo={cartCtx.clearCartAndOrderInfo}
              />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  console.log("Session: ", session);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        pernament: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
