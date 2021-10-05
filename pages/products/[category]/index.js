import { gql } from "@apollo/client";

import client from "../../../lib/apollo";
import ProductsList from "../../../components/products/products-list";

function CategoryPage({ products }) {
  const categoryProducts = products.categoryProducts;

  return (
    <div>
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
      image {
        url
      }
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
    console.error("ERROR>>>>>>>>>>>>>>>>>: ", error);
  }

  return {
    props: {
      products: data,
    },
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
