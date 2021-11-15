import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import Head from "next/head";

import client from "../../../lib/apollo";
import ProductsList from "../../../components/products/products-list";

const CATEGORIES = {
  belayDevices: "Belay Devices",
  carabiners: "Carabiners",
  ropes: "Ropes",
  harnesses: "Harnesses",
  helmets: "Helmets",
};

function CategoryPage({ products }) {
  const categoryProducts = products.categoryProducts;
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Climbing Shop - {router.query.category} </title>
      </Head>
      <h1 className="text-center text-4xl mt-10">
        {CATEGORIES[router.query.category]}
      </h1>
      <ProductsList products={categoryProducts} />
    </div>
  );
}

export default CategoryPage;

export async function getStaticProps(context) {
  const { params } = context;
  const { category } = params;

  const CATEGORY_PRODUCTS = gql`
  query listtCategoryProducts{
    categoryProducts: ${category} {
      _id
      name
      slug
      brand
      price
      inventory_available
      description
      collectionName
      img     
    }
  }
`;
  let data;

  try {
    const res = await client.query({
      query: CATEGORY_PRODUCTS,
    });

    data = res.data;
  } catch (error) {
    console.error("error", error);
  }

  return {
    props: {
      products: data,
    },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  const CATEGORY_PRODUCTS = gql`
    query listProductCategories {
      productCategories {
        name
      }
    }
  `;

  const { data } = await client.query({
    query: CATEGORY_PRODUCTS,
  });

  return {
    paths: data.productCategories.map((item) => ({
      params: {
        category: item.name,
      },
    })),

    fallback: false,
  };
}
