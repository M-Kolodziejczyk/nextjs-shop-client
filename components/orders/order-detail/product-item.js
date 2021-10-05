import Link from "next/link";

function ProductItem(props) {
  const { name, brand, price, slug, collectionName } = props.product;

  const pathName = `/products/${collectionName}/${slug}`;

  return (
    <Link href={pathName}>
      <a className="group">
        <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
        <h3 className="mt-4 text-sm text-gray-700">{brand}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">
          {price.toFixed(2)}$
        </p>
      </a>
    </Link>
  );
}

export default ProductItem;
