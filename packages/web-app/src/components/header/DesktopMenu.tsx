import { NavbarContent, NavbarMenuItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { useLocation, useNavigate } from "react-router-dom";
import { Item } from "./Header.tsx";
import { FC } from "react";
import { useAuth } from "../../context/auth/hooks/useAuth.tsx";
import { AuthCTA } from "./desktop/AuthCTA.tsx";
import { AuthDropdown } from "./desktop/AuthDropdown.tsx";

interface Props {
  items: Item[];
}

export const DesktopMenu: FC<Props> = ({ items }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
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

      {auth.state.isAuthenticated ? (
        <AuthDropdown user={auth.state.user!} />
      ) : (
        <AuthCTA />
      )}
    </>
  );
};