import { Navbar, NavbarMenuToggle } from "@nextui-org/navbar";
import { ApplicationPath } from "../../pages/router";
import { useReducer } from "react";
import { MobileMenu } from "./mobile/MobileMenu.tsx";
import { DesktopMenu } from "./DesktopMenu.tsx";

export interface Item {
  name: string;
  path: ApplicationPath;
}

export const Header = () => {
  const [isOpen, toggleMenu] = useReducer((current) => !current, false);

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
      <DesktopMenu items={menuItems} />

      <NavbarMenuToggle className="sm:hidden" />

      <MobileMenu items={menuItems} toggleMenu={toggleMenu} />
    </Navbar>
  );
};
