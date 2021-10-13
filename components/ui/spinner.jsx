function Spinner() {
  return (
    <div className="flex justify-center items-center absolute top-1/4 w-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-700"></div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}

export default Spinner;
