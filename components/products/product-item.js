import Image from "next/image";
import Link from "next/link";

function ProductItem(props) {
  const { name, brand, image, price, slug, collectionName } = props.product;

  const pathName = `/products/${collectionName}/${slug}`;
  const imageSrc = `${process.env.NEXT_PUBLIC_API_URL}${image[0].url}`;

  return (
    <Link href={pathName}>
      <a className="group">
        <div className="w-full flex justify-center">
          <Image
            src={imageSrc}
            alt={name}
            className="flex w-full h-full bg-auto bg-center transform transition-all group-hover:scale-110 "
            width={300}
            height={300}
          />
        </div>
        <h3 className="mt-2 text-sm text-center uppercase font-bold text-gray-900 transition duration-400 ease-in-out group-hover:text-gray-500  ">
          {brand}
        </h3>
        <h3 className="mt-1 text-xl text-center text-gray-900 transition duration-400 ease-in-out group-hover:text-gray-500   ">
          {name}
        </h3>
        <p className="mt-1 text-lg text-center font-medium text-gray-900 transition duration-400 ease-in-out group-hover:text-gray-500  ">
          {price.toFixed(2)}$
        </p>
      </a>
    </Link>
  );
}

export default ProductItem;
