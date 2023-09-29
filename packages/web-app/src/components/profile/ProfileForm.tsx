import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { schema } from "../auth/schema.ts";
import { useProfileForm } from "./useProfileForm.tsx";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser.tsx";

interface ProfileInputs {
  username: string;
  email: string;
}

export const ProfileForm: FC = () => {
  const auth = useAuthenticatedUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInputs>({
    defaultValues: {
      email: auth.email,
      username: auth.username,
    },
    resolver: zodResolver(schema.profile),
  });

  // Toast handler, allows you to manage all aspects of the toast, displaying loading, errors and success
  const registerFormHandler = useProfileForm();

  const formHandler = async (credential: ProfileInputs) => {
    // Notify users about the status and advancement of their request.
    toast.promise(
      () =>
        registerFormHandler.promise({
          email: credential.email,
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
