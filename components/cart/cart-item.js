import { useContext } from "react";

import CartContext from "../../store/cart-context";

function CartItem({ product }) {
  const cartCtx = useContext(CartContext);

  function deleteProductHandler() {
    cartCtx.deleteProduct(product);
  }

  return (
    <li className="grid grid-cols-12 mt-2">
      <p className="col-span-7">{product.name}</p>
      <p className="col-span-2">{product.brand}</p>
      <p className="col-span-2">{product.price.toFixed(2)}$</p>
      <button className="col-span-1 ml-auto" onClick={deleteProductHandler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </li>
  );
}

export default CartItem;
