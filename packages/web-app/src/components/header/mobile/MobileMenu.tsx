import { NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { ApplicationPath } from "../../../pages/router.tsx";
import { DispatchWithoutAction, FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "@nextui-org/link";
import { Divider } from "@nextui-org/divider";
import { Item } from "../Header.tsx";

interface Props {
  items: Item[];
  toggleMenu: DispatchWithoutAction;
}

export const MobileMenu: FC<Props> = ({ items, toggleMenu }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <NavbarMenu className={"sm:hidden"}>
      {items.map((item, index) => (
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
  );
};
