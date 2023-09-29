import { useAuth } from "../context/auth/hooks/useAuth.tsx";

export const useEasterEgg = () => {
  const auth = useAuth();

  if (!auth.state.user) return;
  if (auth.state.user.username.toLowerCase() === "dinnerbone") {
    document.body.classList.add("rotate-180");
    return "top-auto bottom-0";
  }

  document.body.classList.remove("rotate-180");
};
