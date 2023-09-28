import { NavbarMenu } from "@nextui-org/navbar";
import { DispatchWithoutAction, FC } from "react";
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
  const auth = useAuth();

  return (
    <NavbarMenu className={"sm:hidden"}>
      {auth.state.isAuthenticated ? (
        <AuthCard
          user={auth.state.user!}
          toggleMenu={toggleMenu}
          items={items}
        />
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
