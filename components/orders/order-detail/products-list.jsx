import ProductItem from "./product-item";

function ProductsList(props) {
  const { products } = props;
  return (
    <div className="mt-10">
      <ul className="grid grid-cols-12 border-b-2">
        <li className="col-span-6 md:col-span-9 lg:col-span-6 font-semibold hidden sm:block">
          Product
        </li>
        <li className="col-span-6 md:col-span-3 lg:col-span-3 font-semibold hidden sm:block">
          Brand
        </li>
        <li className="col-span-3 font-semibold hidden lg:block">Price</li>
      </ul>
      <ul>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}

export default ProductsList;
