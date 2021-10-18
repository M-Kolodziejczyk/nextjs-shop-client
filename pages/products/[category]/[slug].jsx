import Image from "next/image";
import { useContext, useEffect } from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";

import { gql } from "@apollo/client";
import Spinner from "../../../components/ui/spinner";
import client from "../../../lib/apollo";
import components from "../../../components/products/product-detail/description";
import CartContext from "../../../store/cart-context";

function ProductDetailPage(props) {
  const { product } = props;
  const cartCtx = useContext(CartContext);
  const successMessage = cartCtx.state.successMessage[product?._id];
  const errorMessage = cartCtx.state.errorMessage[product?._id];

  useEffect(() => {
    if (successMessage && Object.keys(successMessage).length > 0) {
      const timer = setTimeout(() => {
        cartCtx.clearMessage();
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage && Object.keys(errorMessage).length > 0) {
      const timer = setTimeout(() => {
        cartCtx.clearMessage();
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [errorMessage]);

  function addProducthandler() {
    cartCtx.addProduct(product);
  }

  if (!product) {
    return <Spinner />;
  } else {
    const imageSrc = `${process.env.NEXT_PUBLIC_API_URL}${product.image[0].url}`;

    return (
      <section className="mx-auto py-16 lg:max-w-7xl px-2 sm:px-6 lg:px-8">
        <Head>
          <title>{product.name}</title>
          <meta name="description" content={product.description}></meta>
        </Head>
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-4">
            <Image
              src={imageSrc}
              alt={product.name}
              className="object-center rounded"
              width={400}
              height={400}
            />
          </div>
          <div className="col-span-12 md:col-span-8 mt-5 md:mt-0 md:pt-8 lg:pt-12 lg:mt-0">
            <div className="flex flex-col">
              <h2 className="text-gray-900 text-2xl font-bold title-font mb-1">
                {product.brand}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.name}
              </h1>
              <p className="title-font font-medium text-2xl text-gray-900">
                {product.price.toFixed(2)}$
              </p>
            </div>
            <div className="flex mt-5">
              <button
                onClick={addProducthandler}
                className="flex text-white bg-gray-800 border-0 py-2 px-8 focus:outline-none hover:bg-gray-700 rounded"
              >
                Buy
              </button>
            </div>
            {successMessage && (
              <p className="text-green-600 transition">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-600 transition">{errorMessage}</p>
            )}
          </div>
        </div>
        <div className="lex flex-col mt-10">
          <MDXRemote {...props.mdxSource} components={components} />
        </div>
      </section>
    );
  }
}

export default ProductDetailPage;

export async function getStaticProps(context) {
  const { slug, category } = context.params;

  const PRODUCT_QUERY = gql`
    query product($slug: String!) {
      product: ${category} (where: {slug: $slug})  {
        _id
        name
        slug
        brand
        price
        inventory_available
        description
        image {
          url
        }
      }
    }
  `;

  try {
    const res = await client.query({
      query: PRODUCT_QUERY,
      variables: {
        slug: slug,
      },
    });

    const data = res.data.product;

    const mdxSource = await serialize(data[0].description);

    return {
      props: {
        product: data[0],
        mdxSource: mdxSource,
      },
    };
  } catch (error) {
    console.log("error", error);
  }

  return {
    props: {
      product: null,
    },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          category: "Carabiner",
          slug: "Beal-Be-Link-Screwgate",
        },
      },
    ],
    fallback: true,
  };
}
