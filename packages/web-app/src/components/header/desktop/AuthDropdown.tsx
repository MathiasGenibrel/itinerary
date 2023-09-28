import { FC } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { NavbarContent } from "@nextui-org/navbar";
import { Avatar } from "@nextui-org/avatar";
import { LoginResponse } from "@shared/contract/auth.ts";
import { Item } from "../Header.tsx";

interface Props {
  user: LoginResponse;
  items: Item[];
}

export const AuthDropdown: FC<Props> = ({ user, items }) => {
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
          {items.map((item) => {
            return (
              <DropdownItem
                className={item.className}
                key={item.key}
                onPress={item.pressHandler}
                startContent={item.icon}
                color={item.color}
              >
                {item.children}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  );
};
