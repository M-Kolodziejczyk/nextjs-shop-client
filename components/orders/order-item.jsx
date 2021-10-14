import Link from "next/link";

function OrderItem(props) {
  const { id, createdAt, status, amount } = props.order;

  const date = createdAt.slice(0, 10);

  return (
    <li>
      <Link href={`/user/orders/${id}`}>
        <a className="grid grid-cols-12 mt-5 border rounded p-2 hover:bg-gray-100">
          <p className="col-span-12 sm:col-span-6 lg:col-span-3">{id}</p>
          <p className="col-span-12 sm:col-span-6 lg:col-span-3">{date}</p>
          <p className="col-span-12 sm:col-span-6 lg:col-span-3">
            {amount.toFixed(2)}$
          </p>

          <p
            className={`${
              status === "SUCCEEDED" && "text-green-500"
            }   col-span-12 sm:col-span-6 lg:col-span-3`}
          >
            {status}
          </p>
        </a>
      </Link>
    </li>
  );
}

export default OrderItem;
