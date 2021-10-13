import React, { useContext } from "react";
import { useRouter } from "next/router";

import CartContext from "../../store/cart-context";
import CartList from "../../components/cart/cart-list";
import CartForm from "../../components/cart/cart-form";

function CartPage() {
  const router = useRouter();
  const cartCtx = useContext(CartContext);
  const cart = cartCtx.state.cart;

  function clearCartHandler() {
    cartCtx.clearCart();
  }

  return (
    <div className="mx-auto py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      {cart.length === 0 && <h1 className="text-3xl">Your cart is empty</h1>}
      {cart && cart.length > 0 && (
        <>
          <h1 className="text-3xl text-center">Your Cart</h1>
          <div className="mt-5 mb-5 pb-10 border-b-2">
            <ul className="grid grid-cols-12 border-b-2">
              <li className="col-span-8 md:col-span-7 font-semibold hidden sm:block">
                Product
              </li>
              <li className="col-span-4 md:col-span-2 font-semibold hidden sm:block">
                Brand
              </li>
              <li className="col-span-2 font-semibold hidden md:block">
                Price
              </li>
            </ul>
            <CartList cart={cart} />
            <button
              className="flex mx-auto md:mx-0 text-white bg-gray-800 border-0 py-2 px-8 focus:outline-none hover:bg-gray-700 rounded mt-5"
              onClick={clearCartHandler}
            >
              Clear cart
            </button>
          </div>
          <CartForm
            cart={cart}
            createOrderInfo={cartCtx.createOrderInformation}
            pushToCheckout={() => router.push("/checkout")}
          />
        </>
      )}
    </div>
  );
}

export default CartPage;
