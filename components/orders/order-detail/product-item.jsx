import Link from "next/link";

function ProductItem(props) {
  const { name, brand, price, slug, collectionName } = props.product;

  const pathName = `/products/${collectionName}/${slug}`;

  return (
    <li>
      <Link href={pathName}>
        <a className="grid grid-cols-12 mt-5 border rounded p-2 hover:bg-gray-100">
          <p className="col-span-12 md:col-span-9 lg:col-span-6 text-gray-700">
            {name}
          </p>
          <p className="col-span-12 md:col-span-3 text-gray-700">{brand}</p>
          <p className="col-span-12 lg:col-span-3 text-gray-900">
            {price.toFixed(2)}$
          </p>
        </a>
      </Link>
    </li>
  );
}

export default ProductItem;
