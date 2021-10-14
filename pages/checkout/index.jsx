import { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import Head from "next/head";

import CheckoutForm from "../../components/checkout/checkout-form";
import CartContext from "../../store/cart-context";
import Portal from "../../components/ui/portal";
import Spinner from "../../components/ui/spinner";

function CheckoutPage(props) {
  const [products, setProducts] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const cartCtx = useContext(CartContext);
  const cart = cartCtx.state.cart;
  const orderInfo = cartCtx.state.orderInformation;

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
        setProducts(data.availableProducts);
        setClientSecret(data.clientSecret);
        setOrderId(data.id);
        setLoading(false);
      };

      createOrder();
    }
  }, []);

  const promise = loadStripe(
    "pk_test_51HwVilIT5kXxcCpHU34AGuIjYmXG9dBwhuLmA2nMOEs9qkqVNNXRDHHUJF22ctEawAZFUVsV6t6i1sgMHuzFnygD00jzGSqetL"
  );

  return (
    <div className="mx-auto py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <Head>
        <title>Climbing Shop - Checkout</title>
      </Head>
      <h1 className="text-3xl text-center">Checkout Page</h1>
      {products.length > 0 && (
        <div>
          <div className="mt-5 mb-5 pb-10 border-b-2">
            <ul className="grid grid-cols-12 border-b-2">
              <li className="col-span-8 font-semibold hidden sm:block">
                Product
              </li>
              <li className="col-span-4 md:col-span-2 font-semibold hidden sm:block">
                Brand
              </li>
              <li className="col-span-2 font-semibold hidden md:block">
                Price
              </li>
            </ul>
            <ul>
              {products.map((product) => (
                <li key={product.id} className="grid grid-cols-12 mt-5">
                  <p className="col-span-12 sm:col-span-8 text-center sm:text-left text-lg font-medium ">
                    {product.name}
                  </p>
                  <p className="col-span-12 sm:col-span-4 md:col-span-2 text-center sm:text-left ">
                    {product.brand}
                  </p>
                  <p className="col-span-12 sm:col-span-8 md:col-span-2 text-center sm:text-left sm:my-auto">
                    {product.price.toFixed(2)}$
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5">
            <Elements stripe={promise}>
              <CheckoutForm
                token={props.session.jwt}
                orderId={orderId}
                clientSecret={clientSecret}
                clearCartAndOrderInfo={cartCtx.clearCartAndOrderInfo}
              />
            </Elements>

            <div className="mt-7">
              <p className="text-xl text-red-600">To process payment type:</p>
              <p className="text-lg text-red-600">
                Credit card number: 4242 4242 4242 4242
              </p>
              <p className="text-lg text-red-600">
                MM/RR: future expiry date e.g. 01/22
              </p>
              <p className="text-lg text-red-600">CVC: any 3 numbers</p>
              <p className="text-lg text-red-600">
                Postal code: any 5 numbers
              </p>{" "}
            </div>
          </div>
        </div>
      )}
      {loading && (
        <Portal>
          <Spinner />
        </Portal>
      )}
    </div>
  );
}

export default CheckoutPage;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

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
