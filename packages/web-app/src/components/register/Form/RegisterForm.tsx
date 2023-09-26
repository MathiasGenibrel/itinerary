import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRegisterForm } from "./useRegisterForm";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const MIN_PASSWORD_LENGTH = 1;

type Inputs = {
  email: string;
  username: string;
  password: string;
  confirm: string;
};

const schema = z
  .object({
    email: z.string().email(),
    username: z.string().max(64),
    password: z.string().min(MIN_PASSWORD_LENGTH).max(64),
    confirm: z.string().min(MIN_PASSWORD_LENGTH).max(64),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export const RegisterForm = () => {
  const [isLoading, setFormLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirm: "",
    },
    resolver: zodResolver(schema),
  });

  // Toast handler, allows you to manage all aspects of the toast, displaying loading, errors and success
  const toastHandler = useRegisterForm(setFormLoading);

  const formHandler = async (credential: Inputs) => {
    // Notify user of advancement of his request
    toast.promise(
      async () =>
        toastHandler.promise({
          email: credential.email,
          password: credential.password,
          username: credential.username,
        }),
      {
        loading: "Account creation in progress...",
        success: toastHandler.success,
        error: toastHandler.error,
      },
    );
  };

  return (
    <form
      className={"flex flex-col gap-4"}
      onSubmit={handleSubmit((data) => formHandler(data))}
    >
      <input type="submit" />
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
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
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
            <Input
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              isInvalid={!!errors.confirm}
              errorMessage={errors.confirm?.message}
              {...field}
            />
          )}
        />
      </section>

      <Button color="primary" type={"submit"} isLoading={isLoading}>
        Create an account
      </Button>
    </form>
  );
};
