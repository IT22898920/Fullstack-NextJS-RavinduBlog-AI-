import { authOptions } from "../../api/auth/[...nextauth]/options";
import LoginForm from "../../../components/auth/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <main>
      <LoginForm />
    </main>
  );
};

export default Login;
