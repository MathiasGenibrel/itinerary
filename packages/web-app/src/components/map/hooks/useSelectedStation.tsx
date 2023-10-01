import { TravelRequestUpdate } from "@shared/contract/travel.ts";
import { fakerFR } from "@faker-js/faker";
import { toast } from "sonner";
import React, { useState } from "react";
import { Station } from "../station-types.ts";
import { useAuth } from "../../../context/auth/hooks/useAuth.tsx";
import { TravelMemoryRepository } from "../../../helpers/repository/travel/TravelMemoryRepository.ts";

interface SelectedStations {
  starting: Station | null;
  arrival: Station | null;
}

const travelRepository = new TravelMemoryRepository();
const AVERAGE_BICYCLE_SPEED = 15e3; // Correspond to 15Km/h

export const useSelectedStation = () => {
  const auth = useAuth();
  const [selectedStations, setSelectedStations] =
    React.useState<SelectedStations>({ starting: null, arrival: null });
  const [distance, setDistance] = useState<number>(0);

  const saveStationHandler = () => {
    if (!auth.state.isAuthenticated)
      throw new Error("User need to be authenticated");
    if (!selectedStations.starting || !selectedStations.arrival)
      throw new Error("Starting station or Arrival station cannot be null");

    const inputs: TravelRequestUpdate = {
      name: fakerFR.location.street(),
      startPoint: selectedStations.starting.stationcode,
      endPoint: selectedStations.arrival.stationcode,
      distance: String(distance),
      time: (distance / AVERAGE_BICYCLE_SPEED) * 60, // Convert calculated time to minute
    };

    toast.promise(travelRepository.create(inputs, auth.state.user!.id), {
      loading: "Save travel in progress...",
      success: "Your travel has been saved !",
      error: (error: Error) => {
        console.error(error.message);
        return error.message;
      },
    });
  };

  const startingStationHandler = (station: Station) =>
    setSelectedStations((current) => ({
      ...current,
      starting: station,
    }));

  const arrivalStationHandler = (station: Station) =>
    setSelectedStations((current) => ({
      ...current,
      arrival: station,
    }));

  const clearHandler = () =>
    setSelectedStations({ starting: null, arrival: null });

  return {
    selectedStations,
    saveStationHandler,
    startingStationHandler,
    arrivalStationHandler,
    clearHandler,
    setDistance,
  };
};
