import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { toast } from "sonner";
import { useLoginForm } from "./useLoginForm.tsx";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInputs, schema } from "../../schema.ts";
import { FC } from "react";
import { PasswordInput } from "../../register/Form/PasswordInput.tsx";

export const LoginForm: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema.login),
  });

  // Toast handler, allows you to manage all aspects of the toast, displaying loading, errors and success
  const loginFormHandler = useLoginForm();

  const formHandler = async (credential: LoginInputs) => {
    // Notify users about the status and advancement of their request.
    toast.promise(
      async () =>
        loginFormHandler.promise({
          email: credential.email,
          password: credential.password,
        }),
      {
        loading: "Account creation in progress...",
        success: loginFormHandler.success,
        error: loginFormHandler.error,
      },
    );
  };

  return (
    <form
      className={"flex flex-col gap-4"}
      onSubmit={handleSubmit((data) => formHandler(data))}
    >
      <section className={"flex flex-col gap-2"}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              type="email"
              label="Email"
              inputMode="email"
              placeholder="Enter your email"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              autoComplete="current-password"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              {...field}
            />
          )}
        />
      </section>

      <Button
        color="primary"
        type={"submit"}
        isLoading={loginFormHandler.isLoading}
      >
        Connect
      </Button>
    </form>
  );
};
