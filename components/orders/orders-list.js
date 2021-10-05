import OrderItem from "./order-item";

function OrdersList({ ordersList }) {
  return (
    <ul>
      {ordersList.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </ul>
  );
}

export default OrdersList;
