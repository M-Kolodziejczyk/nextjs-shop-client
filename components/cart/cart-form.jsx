import { useState } from "react";

import Portal from "../ui/portal";
import Spinner from "../ui/spinner";

function validateForm(data) {
  let error = {};
  if (!data.name) {
    error.name = "Name is required!";
  } else if (data.name.length < 3) {
    error.name = "Name must be at least 3 characters";
  } else if (!data.address) {
    error.address = "Address is required!";
  } else if (data.address.length < 3) {
    error.address = "Address must be at least 5 characters";
  } else if (!data.city) {
    error.city = "City is required!";
  } else if (data.city.length < 3) {
    error.city = "City must be at least 3 characters";
  }

  return error;
}

function CartForm(props) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  function submitHandler(e) {
    setLoading(true);
    e.preventDefault();

    const formError = validateForm(formData);
    if (Object.keys(formError).length > 0) {
      setError(formError);
      setLoading(false);
    } else {
      props.createOrderInfo(formData);
      props.pushToCheckout();
      setLoading(false);
    }
  }

  function changeHandler(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
      <p className="text-xl font-medium">Order Information</p>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col mt-2">
          <label className="font-medium" htmlFor="name">
            Name
          </label>
          <input
            className="border rounded p-2"
            type="text"
            name="name"
            value={formData.name}
            onChange={changeHandler}
          />
          {error.name && (
            <label className="text-red-500" forhtml="name">
              {error.name}
            </label>
          )}
        </div>
        <div className="flex flex-col mt-2">
          <label className="font-medium " htmlFor="address">
            Address
          </label>
          <input
            className="border rounded p-2"
            type="text"
            name="address"
            value={formData.address}
            onChange={changeHandler}
          />
          {error.address && (
            <label className="text-red-500" forhtml="address">
              {error.address}
            </label>
          )}
        </div>
        <div className="flex flex-col mt-2">
          <label className="font-medium " htmlFor="city">
            City
          </label>
          <input
            className="border rounded p-2"
            type="text"
            name="city"
            value={formData.city}
            onChange={changeHandler}
          />
          {error.city && (
            <label className="text-red-500" forhtml="city">
              {error.city}
            </label>
          )}
        </div>
        <button
          className="flex mt-4 mx-auto md:mx-0 text-white bg-gray-800 border-0 py-2 px-8 focus:outline-none hover:bg-gray-700 rounded"
          type="submit"
        >
          Purchase
        </button>
      </form>
      {loading && (
        <Portal>
          <Spinner />
        </Portal>
      )}
    </div>
  );
}

export default CartForm;
