import { Eye, EyeSlash } from "react-bootstrap-icons";
import { Input } from "@nextui-org/input";
import { FC, useReducer } from "react";
import { LoginInputs, RegisterInputs } from "../../schema.ts";
import { ControllerRenderProps } from "react-hook-form";

interface InputProps {
  label: string;
  placeholder: string;
  autoComplete: string;
  isInvalid: boolean;
  errorMessage?: string;
}

type PasswordInputProps = InputProps &
  Partial<
    ControllerRenderProps<RegisterInputs | LoginInputs, "password" | "confirm">
  >;

export const PasswordInput: FC<PasswordInputProps> = (props) => {
  const [isVisible, toggleVisibility] = useReducer((curr) => !curr, false);

  return (
    <Input
      type={isVisible ? "text" : "password"}
      endContent={
        <button type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <Eye className={"w-5 opacity-75"} />
          ) : (
            <EyeSlash className={"w-5 opacity-75"} />
          )}
        </button>
      }
      {...props}
    />
  );
};
