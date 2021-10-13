import { useState } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import Link from "next/link";

import Spinner from "../../components/ui/spinner";
import Portal from "../../components/ui/portal";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";

function validateForm(data) {
  let error = {};
  if (!data.email) {
    error.email = "Email is required!";
  } else if (!data.password) {
    error.password = "Password is required!";
  } else if (data.password.length < 8) {
    error.password = "Password must be at least 8 characters";
  }

  return error;
}

function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitHandler(event) {
    setLoading(true);
    event.preventDefault();
    const validateInputs = validateForm(formData);

    if (Object.keys(validateInputs).length === 0) {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (!result.error) {
        router.replace("/");
      } else {
        setErrorMessage(result.error);
      }
      setLoading(false);
    } else {
      setLoading(false);
      setError(validateInputs);
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl text-center">Login Page</h1>
      <form onSubmit={submitHandler} className="mt-10 mx-auto max-w-prose">
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

        <div>
          <Button type="submit">Login</Button>
        </div>
        {errorMessage && <p className="mt-3 text-red-500">{errorMessage}</p>}
        <div className="mt-5">
          <Link href="/register">
            <a className="py-2 text-blue-700 hover:text-blue-500 text">
              Register account
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

export default LoginPage;
