import { Button } from "@nextui-org/button";
import { ApplicationPath } from "../../../pages/router.tsx";
import { NavbarMenuItem } from "@nextui-org/navbar";
import { DispatchWithoutAction, FC } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonProps } from "@nextui-org/react";

interface Props {
  to: ApplicationPath;
  toggleMenu: DispatchWithoutAction;
  children: string;
  variant?: ButtonProps["variant"];
}

export const AuthCTA: FC<Props> = ({ to, toggleMenu, variant, children }) => {
  const navigate = useNavigate();
  return (
    <>
      <NavbarMenuItem className={"w-full basis-40 grow"}>
        <Button
          color="primary"
          variant={variant}
          className={"w-full"}
          onPress={() => {
            toggleMenu();
            navigate(to);
          }}
        >
          {children}
        </Button>
      </NavbarMenuItem>
    </>
  );
};
