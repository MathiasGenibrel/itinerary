import { NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { DispatchWithoutAction, FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "@nextui-org/link";
import { Divider } from "@nextui-org/divider";
import { Item } from "../Header.tsx";
import { AuthCTA } from "./AuthCTA.tsx";
import { ApplicationPath } from "../../../pages/router.tsx";
import { useAuth } from "../../../context/auth/hooks/useAuth.tsx";
import { AuthCard } from "./AuthCard.tsx";

interface Props {
  items: Item[];
  toggleMenu: DispatchWithoutAction;
}

export const MobileMenu: FC<Props> = ({ items, toggleMenu }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const auth = useAuth();

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
      {auth.state.isAuthenticated ? (
        <AuthCard user={auth.state.user!} toggleMenu={toggleMenu} />
      ) : (
        <section className={"flex flex-wrap gap-2 items-center w-full"}>
          <AuthCTA
            to={ApplicationPath.LOGIN}
            toggleMenu={toggleMenu}
            variant={"flat"}
          >
            Login
          </AuthCTA>
          <AuthCTA to={ApplicationPath.REGISTER} toggleMenu={toggleMenu}>
            Register
          </AuthCTA>
        </section>
      )}
    </NavbarMenu>
  );
};