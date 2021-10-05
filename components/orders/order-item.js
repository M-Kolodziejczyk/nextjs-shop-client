function OrderItem(props) {
  const { email, address, city, status, amount } = props.order;

  return (
    <li className="border mt-5">
      <p>{email}</p>
      <p>{address}</p>
      <p>{city}</p>
      <p>{status}</p>
      <p>{amount}</p>
    </li>
  );
}

export default OrderItem;
