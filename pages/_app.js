import { Provider } from "next-auth/client";
import { CartContextProvider } from "../store/cart-context";
import { ApolloProvider } from "@apollo/client";

import client from "../lib/apollo";

import Layout from "../components/layout/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ApolloProvider client={client}>
        <CartContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartContextProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
