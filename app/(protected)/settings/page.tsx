import { auth, signOut } from "@/auth";

const SettingPage = async () => {
  const session = await auth();

  return (
    <div>
      <h1>{JSON.stringify(session)}</h1>
      <form
        action={async () => {
          "use server";

          await signOut({
            redirectTo: "/auth/login",
          });
        }}
      >
        <button>Sign Out</button>
      </form>
    </div>
  );
};

export default SettingPage;
