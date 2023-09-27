import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { useLocation, useNavigate } from "react-router-dom";
import { ApplicationPath } from "../../pages/router";
import { useReducer } from "react";

interface Item {
  name: string;
  path: ApplicationPath;
}

export const Header = () => {
  const [isOpen, toggleMenu] = useReducer((current) => !current, false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
        <Link href={ApplicationPath.HOME}>
          <Image src="/logo.svg" alt="Logo" width={75} height={75} />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-3" justify="center">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={item.path === pathname ? "primary" : "foreground"}
              className={"w-full cursor-pointer"}
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" className={"hidden sm:flex"}>
        <NavbarItem>
          <Link href={ApplicationPath.LOGIN}>Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={ApplicationPath.REGISTER}>
            <Button color="primary">Register</Button>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenuToggle className="sm:hidden" />

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={item.path === pathname ? "primary" : "foreground"}
              className={"w-full cursor-pointer"}
              onClick={() => {
                toggleMenu();
                navigate(item.path);
              }}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <Divider />
        <section className={"flex flex-wrap gap-2 items-center w-full"}>
          <NavbarMenuItem className={"w-full basis-40 grow"}>
            <Button
              color="primary"
              variant="flat"
              className={"w-full"}
              onPress={() => {
                toggleMenu();
                navigate(ApplicationPath.LOGIN);
              }}
            >
              Login
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem className={"w-full basis-40 grow"}>
            <Button
              color="primary"
              className={"w-full"}
              onPress={() => {
                toggleMenu();
                return navigate(ApplicationPath.REGISTER);
              }}
            >
              Register
            </Button>
          </NavbarMenuItem>
        </section>
      </NavbarMenu>
    </Navbar>
  );
};
