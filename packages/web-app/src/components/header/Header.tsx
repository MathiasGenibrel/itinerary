import { Navbar, NavbarBrand, NavbarMenuToggle } from "@nextui-org/navbar";
import { ApplicationPath } from "../../pages/router";
import { useReducer } from "react";
import { MobileMenu } from "./mobile/MobileMenu.tsx";
import { DesktopMenu } from "./DesktopMenu.tsx";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import { useNavigate } from "react-router-dom";

export interface Item {
  name: string;
  path: ApplicationPath;
}

export const Header = () => {
  const [isOpen, toggleMenu] = useReducer((current) => !current, false);
  const navigate = useNavigate();

  const menuItems: Item[] = [
    {
      name: "Dashboard",
      path: ApplicationPath.DASHBOARD,
    },
    {
      name: "Profile",
      path: ApplicationPath.PROFILE,
    },
  ];

  return (
    <Navbar isMenuOpen={isOpen} onMenuOpenChange={toggleMenu}>
      <NavbarBrand>
        <Link onPress={() => navigate(ApplicationPath.HOME)}>
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        </Link>
      </NavbarBrand>

      <DesktopMenu items={menuItems} />

      <NavbarMenuToggle className="sm:hidden" />

      <MobileMenu items={menuItems} toggleMenu={toggleMenu} />
    </Navbar>
  );
};
