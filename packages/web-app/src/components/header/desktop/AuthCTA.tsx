import { NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { ApplicationPath } from "../../../pages/router.tsx";
import { FC } from "react";

interface ButtonCTAProps {
  to: ApplicationPath;
  children: string;
}

const ButtonCTA: FC<ButtonCTAProps> = ({ to: destination, children }) => {
  return (
    <NavbarItem>
      <Link href={destination}>{children}</Link>
    </NavbarItem>
  );
};

export const AuthCTA: FC = () => {
  return (
    <NavbarContent justify="end" className={"hidden sm:flex"}>
      <ButtonCTA to={ApplicationPath.LOGIN}>Login</ButtonCTA>
      <ButtonCTA to={ApplicationPath.REGISTER}>Register</ButtonCTA>
    </NavbarContent>
  );
};
