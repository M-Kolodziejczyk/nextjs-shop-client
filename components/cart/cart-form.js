import React, { useState } from "react";

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
  console.log(props);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});

  function submitHandler(e) {
    e.preventDefault();

    const formError = validateForm(formData);
    if (Object.keys(formError).length > 0) {
      setError(formError);
      console.log("ELO:", formError);
    } else {
      props.createOrderInfo(formData);
      props.onSubmit();
    }
  }

  function changeHandler(e) {
    console.log(e.target.name);

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          className="border"
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
      <div>
        <label htmlFor="address">Address: </label>
        <input
          className="border"
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
      <div>
        <label htmlFor="city">City: </label>
        <input
          className="border"
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
      <button type="submit">Purchase</button>
    </form>
  );
}

export default CartForm;
