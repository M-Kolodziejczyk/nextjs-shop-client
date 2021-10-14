import { Fragment } from "react";
import Head from "next/head";

import MainNavigation from "./main-navigation";

function Layout(props) {
  return (
    <Fragment>
      <Head>
        <title>Climbing Shop</title>
      </Head>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
