import { Eye, EyeOff } from "react-feather";
import { Input } from "@nextui-org/input";
import { Dispatch, FC, SetStateAction, useReducer } from "react";

interface Props {
  placeholder: string;
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const PasswordInput: FC<Props> = ({
  label,
  setValue,
  value,
  placeholder,
}) => {
  const [isVisible, toggleVisibility] = useReducer((curr) => !curr, false);

  return (
    <Input
      label={label}
      placeholder={placeholder}
      value={value}
      onValueChange={setValue}
      type={isVisible ? "text" : "password"}
      isRequired={true}
      endContent={
        <button type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <Eye className={"w-5 opacity-75"} />
          ) : (
            <EyeOff className={"w-5 opacity-75"} />
          )}
        </button>
      }
    />
  );
};
