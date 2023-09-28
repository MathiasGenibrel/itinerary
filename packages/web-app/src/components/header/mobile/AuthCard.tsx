import { LoginResponse } from "@shared/contract/auth.ts";
import { DispatchWithoutAction, FC } from "react";
import { User } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { BoxArrowRight } from "react-bootstrap-icons";
import { useAuthDispatcher } from "../../../context/auth/hooks/useAuthDispatcher.tsx";
import { AuthActionType } from "../../../context/auth/types.ts";
import { ApplicationPath } from "../../../pages/router.tsx";
import { useNavigate } from "react-router-dom";
import { NavbarMenuItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Divider } from "@nextui-org/divider";
import { Item } from "../Header.tsx";

interface Props {
  items: Item[];
  user: LoginResponse;
  toggleMenu: DispatchWithoutAction;
}

export const AuthCard: FC<Props> = ({ items, user, toggleMenu }) => {
  const authDispatcher = useAuthDispatcher();
  const navigate = useNavigate();

  const pressHandler = () => {
    toggleMenu();
    authDispatcher.dispatch({ type: AuthActionType.LOGOUT });
    navigate(ApplicationPath.HOME);
  };

  return (
    <>
      {items.map((item, index) => (
        <NavbarMenuItem key={`${item}-${index}`}>
          <Link
            color={"foreground"}
            className={`w-full cursor-pointer ${item.className}`}
            onClick={() => {
              toggleMenu();
              item.pressHandler();
            }}
          >
            {item.children}
          </Link>
        </NavbarMenuItem>
      ))}
      <Divider />
      <section className={"flex justify-between mt-6"}>
        <User
          name={user.username}
          description="Bringing home the bacon!"
          avatarProps={{
            src: "/avatar.webp",
          }}
          className={"cursor-pointer"}
          onClick={() => {
            toggleMenu();
            navigate(ApplicationPath.PROFILE);
          }}
        />
        <Button color={"danger"} onPress={pressHandler}>
          <BoxArrowRight size={16} />
          Sign Out
        </Button>
      </section>
    </>
  );
};
