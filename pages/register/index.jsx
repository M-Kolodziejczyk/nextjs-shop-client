import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import Portal from "../../components/ui/portal";
import Spinner from "../../components/ui/spinner";

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

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function RegisterPage() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [error, setError] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const errorResponse = validateForm(formData);
    setError(errorResponse);

    console.log("ERROR: ", errorResponse);

    if (Object.keys(errorResponse).length === 0) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: formData.email,
              email: formData.email,
              password: formData.password,
              name: formData.name,
            }),
          }
        );

        if (res.status === 200) {
          setFormData(INITIAL_FORM_DATA);
          setSuccessMessage("Account created successfuly");
        }
      } catch (error) {
        setErrorMessage("Something went wrong, try again");
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [errorMessage, successMessage]);

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <Head>
        {" "}
        <title>Climbing Shop - Register</title>
      </Head>
      <h1 className="text-3xl text-center">Register Page</h1>
      <form onSubmit={handleSubmit} className="mt-10 mx-auto max-w-prose">
        <Input
          type="text"
          label="Name"
          name="name"
          value={formData.name}
          handleChange={handleChange}
          error={error}
        />
        <Input
          type="email"
          label="Email"
          name="email"
          value={formData.email}
          handleChange={handleChange}
          error={error}
        />
        <Input
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          handleChange={handleChange}
          error={error}
        />
        <Input
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          handleChange={handleChange}
          error={error}
        />

        <div>
          <Button type="submit">Register</Button>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <div className="mt-5">
          <Link href="/login">
            <a className="mt-5 py-2 text-blue-700 hover:text-blue-500 text">
              Go to Login Page
            </a>
          </Link>
        </div>
      </form>
      {loading && (
        <Portal>
          <Spinner />
        </Portal>
      )}
    </div>
  );
}

export default RegisterPage;
