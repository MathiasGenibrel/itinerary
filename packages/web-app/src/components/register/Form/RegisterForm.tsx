import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { FormEvent, useState } from "react";
import { AuthRepository } from "../../../helpers/repository/auth/AuthRepository";
import { AuthMemoryRepository } from "../../../helpers/repository/auth/AuthMemoryRepository";
import { toast } from "sonner";
import { PasswordInput } from "./PasswordInput";

export const RegisterForm = () => {
  const [isLoading, setFormLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const authService: AuthRepository = new AuthMemoryRepository();

  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(
      () => {
        setFormLoading(true);
        return authService.register({
          email,
          password,
          username,
        });
      },
      {
        loading: "Account creation in progress...",
        success: () => {
          setFormLoading(false);
          return "Your account has been created";
        },
        error: (data: Error) => {
          setFormLoading(false);
          return data.message;
        },
      },
    );
  };

  return (
    <form className={"flex flex-col gap-4"} onSubmit={formHandler}>
      <section className={"flex flex-col gap-2"}>
        <Input
          type="email"
          label="Email"
          inputMode="email"
          placeholder="Enter your email"
          isRequired={true}
          value={email}
          onValueChange={setEmail}
        />
        <Input
          type="text"
          label="Username"
          placeholder="Enter your username"
          isRequired={true}
          value={username}
          onValueChange={setUsername}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          setValue={setPassword}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          setValue={setConfirmPassword}
        />
      </section>

      <Button color="primary" type={"submit"} isLoading={isLoading}>
        Create an account
      </Button>
    </form>
  );
};
