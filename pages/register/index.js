import { useState, useEffect } from "react";
import axios from "axios";

function validateForm(data) {
  let error = {};
  if (!data.name) {
    error.name = "Name is required!";
  } else if (data.name.length < 3) {
    error.name = "Name must be at least 3 characters";
  } else if (!data.email) {
    error.email = "Email is required!";
  } else if (!data.password) {
    error.password = "Password is required!";
  } else if (data.password.length < 8) {
    error.password = "Password must be at least 8 chatacters";
  } else if (data.password !== data.confirmPassword) {
    error.confirmPassword = "Paswords are not matching";
  }

  return error;
}

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function changeHandler(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const user = {
    email: "talfor269@gmail.com",
    name: "Mike",
    password: "CZ",
  };

  console.log("FORM DATA: ", formData);

  async function registerHandler(e) {
    e.preventDefault();

    const errorResponse = validateForm(formData);
    // setError(validateForm(formData));
    setError(errorResponse);

    if (Object.keys(errorResponse).length === 0 || true) {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`,
          {
            username: formData.email,
            email: formData.email,
            password: formData.password,
            name: formData.name,
          }
        );
        console.log("RES: ", res);
        if (res.status === 200) {
          setSuccessMessage(res.statusText);
        }
        console.log("RESPONSE>>>", res);
      } catch (error) {
        console.log("ERROR: ", error);
        setErrorMessage(error.message);
      }
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage("");
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [errorMessage]);

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1>Register page</h1>

      <form onSubmit={registerHandler}>
        <div>
          <label forhtml="name">Name</label>
          <input
            type="name"
            name="name"
            className="border"
            onChange={changeHandler}
          />
          {error.name && (
            <div>
              <label className="text-red-500" forhtml="name">
                {error.name}
              </label>
            </div>
          )}
        </div>
        <div>
          <label forhtml="email">Email</label>
          <input
            type="email"
            name="email"
            className="border"
            onChange={changeHandler}
          />
          {error.email && (
            <div>
              <label className="text-red-500" forhtml="email">
                {error.email}
              </label>
            </div>
          )}
        </div>
        <div>
          <label forhtml="password">Password</label>
          <input
            type="password"
            name="password"
            className="border"
            onChange={changeHandler}
          />
          {error.password && (
            <div>
              <label className="text-red-500" forhtml="password">
                {error.password}
              </label>
            </div>
          )}
        </div>
        <div>
          <label forhtml="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="border"
            onChange={changeHandler}
          />
          {error.confirmPassword && (
            <div>
              <label className="text-red-500" forhtml="password">
                {error.confirmPassword}
              </label>
            </div>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
          >
            Register
          </button>
        </div>
        {errorMessage && (
          <p className="text-red-500">Failed to register user</p>
        )}
        {successMessage && (
          <p className="text-green-500">User Register successfully</p>
        )}
      </form>
    </div>
  );
}

export default RegisterPage;
