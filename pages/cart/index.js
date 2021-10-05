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
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      {cart.length === 0 && <h1 className="text-3xl">Your cart is empty</h1>}
      {cart && cart.length > 0 && (
        <>
          <h1 className="text-3xl">Cart Page</h1>
          <div className="mt-5">
            <ul className="grid grid-cols-12 border-b-2">
              <li className="col-span-7">Name</li>
              <li className="col-span-2">Brand</li>
              <li className="col-span-2">Price</li>
            </ul>
            <CartList cart={cart} />
            <buton onClick={clearCartHandler}>Clear cart</buton>
          </div>
          <CartForm
            cart={cart}
            createOrderInfo={cartCtx.createOrderInformation}
            onSubmit={() => router.push("/checkout")}
          />
        </>
      )}
    </div>
  );
}

export default CartPage;
