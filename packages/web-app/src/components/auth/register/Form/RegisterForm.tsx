import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { toast } from "sonner";
import { useRegisterForm } from "./useRegisterForm.tsx";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterInputs, schema } from "../../schema.ts";
import { FC } from "react";
import { PasswordInput } from "./PasswordInput.tsx";

export const RegisterForm: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirm: "",
    },
    resolver: zodResolver(schema.register),
  });

  // Toast handler, allows you to manage all aspects of the toast, displaying loading, errors and success
  const registerFormHandler = useRegisterForm();

  const formHandler = async (credential: RegisterInputs) => {
    // Notify users about the status and advancement of their request.
    toast.promise(
      async () =>
        registerFormHandler.promise({
          email: credential.email,
          password: credential.password,
          username: credential.username,
        }),
      {
        loading: "Account creation in progress...",
        success: registerFormHandler.success,
        error: registerFormHandler.error,
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
          name="username"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              label="Username"
              placeholder="Enter your username"
              autoComplete="username"
              isInvalid={!!errors.username}
              errorMessage={errors.username?.message}
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
              autoComplete="new-password"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="confirm"
          control={control}
          render={({ field }) => (
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              autoComplete="new-password"
              isInvalid={!!errors.confirm}
              errorMessage={errors.confirm?.message}
              {...field}
            />
          )}
        />
      </section>

      <Button
        color="primary"
        type={"submit"}
        isLoading={registerFormHandler.isLoading}
      >
        Create an account
      </Button>
    </form>
  );
};
