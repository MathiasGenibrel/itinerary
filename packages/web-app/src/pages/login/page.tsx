import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Toaster } from "sonner";
import { LoginForm } from "../../components/auth/login/Form/LoginForm.tsx";
import { ApplicationPath } from "../router.tsx";
import { useNavigate } from "react-router-dom";

export default function Page() {
  const navigate = useNavigate();

  return (
    <section className={"flex flex-col justify-center mx-8 h-[100dvh]"}>
      <Toaster />
      <Card>
        <CardBody className={"gap-2"}>
          <h1 className={"text-3xl font-medium text-center"}>Login</h1>
          <LoginForm />
          <span>
            Don't have an account ?{" "}
            <Link
              onPress={() => navigate(ApplicationPath.REGISTER)}
              className={"cursor-pointer"}
            >
              Register to Itinerary
            </Link>
          </span>
        </CardBody>
      </Card>
    </section>
  );
}
