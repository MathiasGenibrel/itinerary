import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { AuthRepository } from "../../helpers/repository/auth/AuthRepository";
import { AuthMemoryRepository } from "../../helpers/repository/auth/AuthMemoryRepository";
import { FormEvent, useReducer, useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { toast, Toaster } from "sonner";

export default function Page() {
  const [isVisiblePassword, togglePasswordVisibility] = useReducer(
    (curr) => !curr,
    false,
  );

  const [isLoading, setFormLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const authService: AuthRepository = new AuthMemoryRepository();

  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(
      () => {
        setFormLoading(true);
        return authService.login({
          email,
          password,
        });
      },
      {
        loading: "Connecting...",
        success: (data) => {
          setFormLoading(false);
          localStorage.setItem("user", JSON.stringify(data));
          return "Connection successfully";
        },
        error: (data: Error) => {
          setFormLoading(false);
          return data.message;
        },
      },
    );
  };

  return (
    <section className={"flex flex-col justify-center mx-8 h-[100dvh]"}>
      <Toaster />
      <Card>
        <CardBody className={"gap-2"}>
          <h1 className={"text-3xl font-medium text-center"}>Login</h1>
          <form className={"flex flex-col gap-4"} onSubmit={formHandler}>
            <section>
              <Input
                type="email"
                label="Email"
                name="email"
                inputMode="email"
                placeholder="Enter your email"
                isRequired={true}
                value={email}
                onValueChange={setEmail}
              />
              <Input
                type={isVisiblePassword ? "text" : "password"}
                label="Password"
                name="password"
                placeholder="Enter your password"
                isRequired={true}
                endContent={
                  <button type="button" onClick={togglePasswordVisibility}>
                    {isVisiblePassword ? (
                      <Eye className={"w-5 opacity-75"} />
                    ) : (
                      <EyeOff className={"w-5 opacity-75"} />
                    )}
                  </button>
                }
                value={password}
                onValueChange={setPassword}
              />
            </section>
            <Button color="primary" type={"submit"} isLoading={isLoading}>
              Login
            </Button>
          </form>
          <span>
            Don't have an account ?{" "}
            <Link href={"/register"}>Register to Itinerary</Link>
          </span>
        </CardBody>
      </Card>
    </section>
  );
}
