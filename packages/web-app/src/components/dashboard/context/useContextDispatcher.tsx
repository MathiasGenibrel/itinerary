import { useContext } from "react";
import { TravelDispatchContext } from "./TravelProvider.tsx";

export const useTravelDispatcher = () => {
  const context = useContext(TravelDispatchContext);
  if (!context) {
    throw new Error(
      "useTravelDispatcher must be used within an TravelProvider",
    );
  }

  return context;
};
