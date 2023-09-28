import { Navbar, NavbarBrand, NavbarMenuToggle } from "@nextui-org/navbar";
import { ApplicationPath } from "../../pages/router";
import { ReactElement, useReducer } from "react";
import { MobileMenu } from "./mobile/MobileMenu.tsx";
import { DesktopMenu } from "./DesktopMenu.tsx";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import { useNavigate } from "react-router-dom";
import { ButtonProps } from "@nextui-org/react";
import { useAuthDispatcher } from "../../context/auth/hooks/useAuthDispatcher.tsx";
import { useAuth } from "../../context/auth/hooks/useAuth.tsx";
import { AuthActionType } from "../../context/auth/types.ts";
import {
  BoxArrowRight,
  Gear,
  GeoAlt,
  QuestionCircle,
} from "react-bootstrap-icons";

export interface Item {
  pressHandler: () => void;
  key: string;
  children: string | ReactElement;
  color?: ButtonProps["color"];
  icon?: ReactElement;
  className?: string;
}

export const Header = () => {
  const [isOpen, toggleMenu] = useReducer((current) => !current, false);
  const navigate = useNavigate();
  const authDispatcher = useAuthDispatcher();
  const auth = useAuth();

  const logoutHandler = () => {
    authDispatcher.dispatch({ type: AuthActionType.LOGOUT });
    navigate(ApplicationPath.HOME);
  };

  const items: Item[] = [
    {
      key: "profile",
      pressHandler: () => navigate(ApplicationPath.DASHBOARD),
      className: "hidden sm:flex h-14 gap-2",
      children: (
        <>
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{auth.state.user?.email}</p>
        </>
      ),
    },
    {
      key: "dashboard",
      icon: <GeoAlt />,
      pressHandler: () => navigate(ApplicationPath.DASHBOARD),
      children: "Dashboard",
    },
    {
      key: "Gear",
      icon: <Gear />,
      pressHandler: () => navigate(ApplicationPath.PROFILE),
      children: "Settings",
    },
    {
      key: "help",
      icon: <QuestionCircle />,
      pressHandler: () => navigate(ApplicationPath.HELP),
      children: "Help & Feedback",
    },
    {
      key: "logout",
      color: "danger",
      className: "hidden sm:flex text-danger",
      icon: <BoxArrowRight />,
      pressHandler: () => logoutHandler(),
      children: "Log Out",
    },
  ];

  return (
    <Navbar isMenuOpen={isOpen} onMenuOpenChange={toggleMenu}>
      <NavbarBrand>
        <Link
          onPress={() => {
            if (isOpen) toggleMenu();
            navigate(ApplicationPath.HOME);
          }}
        >
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        </Link>
      </NavbarBrand>

      <DesktopMenu items={items} />

      <NavbarMenuToggle className="sm:hidden" />

      <MobileMenu items={items} toggleMenu={toggleMenu} />
    </Navbar>
  );
};
