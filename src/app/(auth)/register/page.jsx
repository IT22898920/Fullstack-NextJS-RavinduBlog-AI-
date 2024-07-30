import { authOptions } from "../../api/auth/[...nextauth]/options";
import RegisterForm from "@/components/auth/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Register = async () => {
  // protect register page from logged in users

  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return <RegisterForm />;
};

export default Register;
