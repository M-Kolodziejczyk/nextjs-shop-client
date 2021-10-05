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
  console.log("DATA: ", order);

  return (
    <div>
      {order && (
        <div>
          <p>{order.email}</p>
          <p>{order.address}</p>
          <p>{order.city}</p>
          <p>{order.amount}$</p>
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
