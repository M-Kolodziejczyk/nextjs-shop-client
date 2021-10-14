import OrderItem from "./order-item";

function OrdersList({ ordersList }) {
  return (
    <div className="mt-10">
      <ul className="grid grid-cols-12 border-b-2">
        <li className="col-span-6 lg:col-span-3 font-semibold hidden sm:block">
          ID
        </li>
        <li className="col-span-6 lg:col-span-3 font-semibold hidden sm:block">
          Date
        </li>
        <li className="col-span-3 font-semibold hidden lg:block">Price</li>
        <li className="col-span-3 font-semibold hidden lg:block">Status</li>
      </ul>
      <ul>
        {ordersList.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </ul>
    </div>
  );
}

export default OrdersList;
