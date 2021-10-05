import { useRef } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

function LoginPage() {
  // TASK: wyswietlanie error message
  const router = useRouter();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });

    if (!result.error) {
      router.replace("/");
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1>Login</h1>

      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            className="border"
            type="email"
            name="email"
            required
            ref={emailInputRef}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            className="border"
            type="password"
            name="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div>
          <button
            type="submit"
            className="flex  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
          >
            Register
          </button>
        </div>
      </form>
      <div>{/* <button onClick={() => signIn()}>Sign in</button> */}</div>
    </div>
  );
}

export default LoginPage;

// export async function getServerSideProps(context) {
//   // console.log('CONEXTS" ', context);

//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// }

// export async function getServerSideProps({ req }) {
//   let headers = {};

//   if (session) {
//     headers = { Authorization: `Bearer ${session.jwt}` };
//   }

//   return {
//     props: {
//       data: session,
//     },
//   };
// }
