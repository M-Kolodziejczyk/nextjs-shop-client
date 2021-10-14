import { gql } from "@apollo/client";
import client from "../lib/apollo";
import ProductsList from "../components/products/products-list";

export default function Home(props) {
  const featuredProducts = props.featuredProducts;

  return (
    <div>
      <ProductsList products={featuredProducts} />
    </div>
  );
}

export async function getStaticProps() {
  const PRODUCT_QUERY = gql`
    query {
      featured {
        carabiners {
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
        helmets {
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
        belay_devices {
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
        harnesses {
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
        ropes {
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
    }
  `;
  let featuredProducts = [];

  try {
    const res = await client.query({
      query: PRODUCT_QUERY,
    });

    for (let key of Object.keys(res.data.featured)) {
      if (
        Array.isArray(res.data.featured[key]) &&
        res.data.featured[key].length > 0
      ) {
        featuredProducts.push(...res.data.featured[key]);
      }
    }
  } catch (error) {
    console.log("error", error);
  }

  return {
    props: {
      featuredProducts: featuredProducts,
    },
  };
}
