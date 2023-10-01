import { useContext } from "react";
import { TravelContext } from "./TravelProvider.tsx";

export const useTravelContext = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error("useTravelContext must be used within an TravelProvider");
  }

  return context;
};
