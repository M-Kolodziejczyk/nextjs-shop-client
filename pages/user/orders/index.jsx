import { useEffect, useState } from "react";
import { getSession } from "next-auth/client";

import OrdersList from "../../../components/orders/orders-list";

function UserOrders(props) {
  const [ordersList, setOrdersList] = useState([]);
  useEffect(async () => {
    const getOrders = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user-orders`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${props.session.jwt}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: props.session.user.email }),
        }
      );

      const data = await response.json();
      setOrdersList(data);
    };

    getOrders();
  }, []);

  return (
    <div className="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl text-center">Orders</h1>
      {ordersList.length > 0 && <OrdersList ordersList={ordersList} />}
    </div>
  );
}

export default UserOrders;

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
