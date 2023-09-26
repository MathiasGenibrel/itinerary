import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { PasswordInput } from "./PasswordInput";
import { useRegisterForm } from "./useRegisterForm";

export const RegisterForm = () => {
  const [isLoading, setFormLoading] = useState<boolean>(false);

  // States for controlled inputs
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Toast handler, allows you to manage all aspects of the toast, displaying loading, errors and success
  const toastHandler = useRegisterForm(setFormLoading);

  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Notify user of advancement of his request
    toast.promise(
      async () => toastHandler.promise({ email, password, username }),
      {
        loading: "Account creation in progress...",
        success: toastHandler.success,
        error: toastHandler.error,
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
