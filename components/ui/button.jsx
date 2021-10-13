function Button(props) {
  return (
    <button
      type={props.type}
      className="flex mx-auto md:mx-0 text-white bg-gray-800 border-0 py-2 px-8 focus:outline-none hover:bg-gray-700 rounded mt-5"
    >
      {props.children}
    </button>
  );
}

export default Button;
