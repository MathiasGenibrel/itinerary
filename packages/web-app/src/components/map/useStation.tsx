import { useState } from "react";
import { Station } from "./station-types.ts";
import { toast } from "sonner";
import { TravelRepository } from "../../helpers/repository/travel/TravelRepository.ts";
import { TravelMemoryRepository } from "../../helpers/repository/travel/TravelMemoryRepository.ts";

const travelRepository: TravelRepository = new TravelMemoryRepository();

export const useStation = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [isLoading, setLoader] = useState<boolean>(true);

  const toastHandler = () =>
    toast.promise(
      async () => {
        return travelRepository.getStations();
      },
      {
        loading: "Getting stations...",
        success: (stations) => {
          setStations(stations);
          setLoader(false);
          return "All stations have been recovered";
        },
        error: (error: Error) => {
          setLoader(false);
          console.error("[ERROR]: With getting station : ", error);
          return error.message;
        },
      },
    );

  return {
    toastHandler,
    isLoading,
    stations,
  };
};
