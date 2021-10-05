import { getSession } from "next-auth/client";

function ProfilePage() {
  return <div>PROFILE PAGE</div>;
}

export default ProfilePage;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  console.log("SESSION: ", session);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        pernament: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
