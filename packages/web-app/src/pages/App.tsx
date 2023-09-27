import { Link } from "react-router-dom";
import { ApplicationPath } from "./router.tsx";

export const App = () => {
  return (
    <>
      <h1>Hello World !</h1>
      <Link to={ApplicationPath.LOGIN}>Login</Link>
      <Link to={ApplicationPath.REGISTER}>Register</Link>
    </>
  );
};
