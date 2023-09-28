import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Toaster } from "sonner";
import { RegisterForm } from "../../components/auth/register/Form/RegisterForm.tsx";
import { useNavigate } from "react-router-dom";
import { ApplicationPath } from "../router.tsx";

export default function Page() {
  const navigate = useNavigate();
  return (
    <section className={"flex flex-col justify-center"}>
      <Toaster />
      <Card>
        <CardBody className={"gap-2"}>
          <h1 className={"text-3xl font-medium text-center"}>Sign up</h1>
          <RegisterForm />
          <span>
            Already have an account ?{" "}
            <Link
              onPress={() => navigate(ApplicationPath.LOGIN)}
              className={"cursor-pointer"}
            >
              Sign in to Itinerary
            </Link>
          </span>
        </CardBody>
      </Card>
    </section>
  );
}
