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

  return auth.state.isAuthenticated ? (
    <AuthDropdown user={auth.state.user!} items={items} />
  ) : (
    <AuthCTA />
  );
};
