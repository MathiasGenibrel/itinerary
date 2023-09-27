import { LoginResponse } from "@shared/contract/auth.ts";
import { DispatchWithoutAction, FC } from "react";
import { User } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { BoxArrowRight } from "react-bootstrap-icons";
import { useAuthDispatcher } from "../../../context/auth/hooks/useAuthDispatcher.tsx";
import { AuthActionType } from "../../../context/auth/types.ts";
import { ApplicationPath } from "../../../pages/router.tsx";
import { useNavigate } from "react-router-dom";

interface Props {
  user: LoginResponse;
  toggleMenu: DispatchWithoutAction;
}

export const AuthCard: FC<Props> = ({ user, toggleMenu }) => {
  const authDispatcher = useAuthDispatcher();
  const navigate = useNavigate();

  const pressHandler = () => {
    toggleMenu();
    authDispatcher.dispatch({ type: AuthActionType.LOGOUT });
    navigate(ApplicationPath.HOME);
  };

  return (
    <section className={"flex justify-between mt-6"}>
      <User
        name={user.username}
        description="Bringing home the bacon!"
        avatarProps={{
          src: "/avatar.webp",
        }}
      />
      <Button color={"danger"} onPress={pressHandler}>
        <BoxArrowRight size={16} />
        Sign Out
      </Button>
    </section>
  );
};
