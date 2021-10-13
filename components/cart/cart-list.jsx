import CartItem from "./cart-item";

function CartList({ cart }) {
  return (
    <ul>
      {cart.map((product) => (
        <CartItem key={product._id || product.id} product={product} />
      ))}
    </ul>
  );
}

export default CartList;
