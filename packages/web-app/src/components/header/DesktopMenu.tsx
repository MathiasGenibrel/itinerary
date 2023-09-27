import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { ApplicationPath } from "../../pages/router.tsx";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { useLocation, useNavigate } from "react-router-dom";
import { Item } from "./Header.tsx";
import { FC } from "react";

interface Props {
  items: Item[];
}

export const DesktopMenu: FC<Props> = ({ items }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <NavbarBrand>
        <Link href={ApplicationPath.HOME}>
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-3" justify="center">
        {items.map((item, index) => (
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
    </>
  );
};
