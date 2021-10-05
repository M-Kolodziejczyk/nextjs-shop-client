import Image from "next/image";
import Link from "next/link";

function ProductItem(props) {
  const { name, brand, image, price, slug, collectionName } = props.product;

  const pathName = `/products/${collectionName}/${slug}`;
  const imageSrc = `${process.env.NEXT_PUBLIC_API_URL}${image[0].url}`;

  return (
    <Link href={pathName}>
      <a className="group">
        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
          <Image
            src={imageSrc}
            alt={name}
            // className="w-full h-full object-center object-cover lg:w-full lg:h-full"
            className="w-full h-full object-center object-cover group-hover:opacity-75"
            // className="w-full h-full object-center object-cover"
            width={200}
            height={300}
          />
        </div>
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
