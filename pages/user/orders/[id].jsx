import { useEffect, useState } from "react";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";

import ProductsList from "../../../components/orders/order-detail/products-list";

function OrderDetail(props) {
  const router = useRouter();
  const [order, setOrder] = useState();

  useEffect(async () => {
    const getOrders = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${router.query.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${props.session.jwt}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setOrder(data);
    };

    getOrders();
  }, []);

  return (
    <div className="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl text-center">Order detail</h1>
      {order && (
        <div className="mt-10">
          <p className="text-lg">
            <span className="font-medium">Email: </span>
            {order.email}
          </p>
          <p className="text-lg">
            <span className="font-medium">Status: </span>
            <span
              className={`${order.status === "SUCCEEDED" && "text-green-500"}`}
            >
              {order.status}
            </span>
          </p>
          <p className="text-lg">
            <span className="font-medium">Address: </span>
            {order.address}
          </p>
          <p className="text-lg">
            <span className="font-medium">City: </span>
            {order.city}
          </p>
          <p className="text-lg">
            <span className="font-medium">Amount: </span>
            {order.amount}$
          </p>
        </div>
      )}
      {order && order.products && <ProductsList products={order.products} />}
    </div>
  );
}

export default OrderDetail;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

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
