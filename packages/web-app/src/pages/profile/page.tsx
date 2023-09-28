import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { AuthRepository } from "../../helpers/repository/auth/AuthRepository";
import { AuthMemoryRepository } from "../../helpers/repository/auth/AuthMemoryRepository";
import { FormEvent, useState } from "react";
import { toast, Toaster } from "sonner";
import { useAuth } from "../../context/auth/hooks/useAuth.tsx";

export default function Page() {
  const auth = useAuth();
  if (!auth.state.isAuthenticated) throw new Error("User not logged in");
  const user = auth.state.user!;

  const [isLoading, setFormLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>(user.email ?? "");

  const [username, setUsername] = useState<string>(user.username ?? "");

  const authService: AuthRepository = new AuthMemoryRepository();

  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(
      () => {
        setFormLoading(true);
        return authService.updateCredentials({
          id: user.id,
          email,
          username,
          token: user.token,
        });
      },
      {
        loading: "Updating...",
        success: (data) => {
          setFormLoading(false);
          localStorage.setItem("user", JSON.stringify(data));
          // setUser(data);
          return "Update successfully";
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
          <h1 className={"text-3xl font-medium text-center"}>
            Update Credentials
          </h1>
          <form className={"flex flex-col gap-4"} onSubmit={formHandler}>
            <section>
              <Input
                type="email"
                label="Email"
                name="email"
                inputMode="email"
                placeholder={user.email}
                isRequired={true}
                value={email}
                onValueChange={setEmail}
              />
              <Input
                type="username"
                label="Username"
                name="username"
                inputMode="text"
                placeholder={user.username}
                isRequired={true}
                value={username}
                onValueChange={setUsername}
              />
            </section>
            <Button color="primary" type={"submit"} isLoading={isLoading}>
              Update credentials
            </Button>
          </form>
        </CardBody>
      </Card>
    </section>
  );
}
