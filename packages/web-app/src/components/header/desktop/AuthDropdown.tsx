import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { NavbarContent } from "@nextui-org/navbar";
import { Avatar } from "@nextui-org/avatar";
import { LoginResponse } from "@shared/contract/auth.ts";
import { FC } from "react";
import {
  BoxArrowRight,
  Gear,
  GeoAlt,
  QuestionCircle,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { ApplicationPath } from "../../../pages/router.tsx";
import { useAuthDispatcher } from "../../../context/auth/hooks/useAuthDispatcher.tsx";
import { AuthActionType } from "../../../context/auth/types.ts";

interface Props {
  user: LoginResponse;
}

export const AuthDropdown: FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const authDispatcher = useAuthDispatcher();

  const logoutHandler = () => {
    authDispatcher.dispatch({ type: AuthActionType.LOGOUT });
    navigate(ApplicationPath.HOME);
  };

  return (
    <NavbarContent justify="end" className={"hidden sm:flex"}>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            as="button"
            className="transition-transform"
            name={user.username}
            src="/avatar.webp"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem
            key="profile"
            className="h-14 gap-2"
            onPress={() => navigate(ApplicationPath.PROFILE)}
          >
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user.email}</p>
          </DropdownItem>
          <DropdownItem
            key="settings"
            startContent={<GeoAlt />}
            onPress={() => navigate(ApplicationPath.DASHBOARD)}
          >
            Dashboard
          </DropdownItem>
          <DropdownItem
            key="settings"
            startContent={<Gear />}
            onPress={() => navigate(ApplicationPath.PROFILE)}
          >
            Settings
          </DropdownItem>
          <DropdownItem
            key="help_and_feedback"
            startContent={<QuestionCircle />}
            onPress={() => navigate(ApplicationPath.HOME)}
          >
            {/*  TODO Add "ApplicationPath.HELP" to redirect user to Help center. */}
            Help & Feedback
          </DropdownItem>
          <DropdownItem
            className="text-danger"
            key="logout"
            color="danger"
            startContent={<BoxArrowRight />}
            onPress={logoutHandler}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  );
};
