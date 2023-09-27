import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Toaster } from "sonner";
import { RegisterForm } from "../../components/auth/register/Form/RegisterForm.tsx";

export default function Page() {
  return (
    <section className={"flex flex-col justify-center mx-8 h-[100dvh]"}>
      <Toaster />
      <Card>
        <CardBody className={"gap-2"}>
          <h1 className={"text-3xl font-medium text-center"}>Sign up</h1>
          <RegisterForm />
          <span>
            Don't have an account ?{" "}
            <Link href={"/login"}>Sign in to Itinerary</Link>
          </span>
        </CardBody>
      </Card>
    </section>
  );
}
