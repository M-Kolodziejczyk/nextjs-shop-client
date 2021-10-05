import CartItem from "./cart-item";

function CartList({ cart }) {
  console.log("cart: ", cart);
  return (
    <ul>
      {cart.map((product) => (
        <CartItem key={product._id} product={product} />
      ))}
    </ul>
  );
}

export default CartList;
