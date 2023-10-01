import React, { FC, useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Save, Trash } from "react-bootstrap-icons";
import { Button } from "@nextui-org/react";
import "leaflet-routing-machine";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import { Card } from "@nextui-org/card";
import { Station } from "./station-types.ts";
import { useStation } from "./useStation.tsx";
import { toast, Toaster } from "sonner";
import { Loader } from "./Loader.tsx";
import { TravelMemoryRepository } from "../../helpers/repository/travel/TravelMemoryRepository.ts";
import { TravelRequestUpdate } from "@shared/contract/travel.ts";
import { fakerFR } from "@faker-js/faker";
import { SelectedStationMarker } from "./marker/SelectedStationMarker.tsx";
import { StationMarkerList } from "./marker/StationMarkerList.tsx";
import { StationSelector } from "./StationSelector.tsx";
import { useAuth } from "../../context/auth/hooks/useAuth.tsx";

const travelRepository = new TravelMemoryRepository();

interface SelectedStations {
  starting: Station | null;
  arrival: Station | null;
}

export const StationMapWrapper: React.FC = () => {
  const auth = useAuth();
  const { stations, isLoading, toastHandler } = useStation();
  const [selectedStations, setSelectedStations] =
    React.useState<SelectedStations>({ starting: null, arrival: null });

  useEffect(() => {
    toastHandler();
  }, []);

  /*
  TODO: Open a Modal when a auth click on "SAVE":
    - User is connected => Modal with form to choose the name of travel, with two button => [SaveAndClose, SaveAndDownload]
    - User is not connected => Modal to logging-in or create an account, and after that, open the modal to save travel
   */
  const handleClickSave = () => {
    if (!auth.state.isAuthenticated)
      throw new Error("Use need to be authenticated");
    if (!selectedStations.starting || !selectedStations.arrival)
      throw new Error("Starting station or Arrival station cannot be null");

    const inputs: TravelRequestUpdate = {
      name: fakerFR.location.street(),
      startPoint: selectedStations.starting.stationcode,
      endPoint: selectedStations.arrival.stationcode,
      distance: String(distance),
      time: time,
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

  const [distance, setDistance] = useState<number>(0);
  const [time, setTime] = useState<number>(0);

  const createRoutineMachineLayer = () => {
    const instance = L.Routing.control({
      waypoints: [
        L.latLng(
          selectedStations.starting?.coordonnees_geo?.lat || 0,
          selectedStations.starting?.coordonnees_geo?.lon || 0,
        ),
        L.latLng(
          selectedStations.arrival?.coordonnees_geo?.lat || 0,
          selectedStations.arrival?.coordonnees_geo?.lon || 0,
        ),
      ],
    });
    instance.on("routesfound", function (e) {
      const [point] = e.routes;
      const summary = point.summary;
      setDistance(Math.round(summary.totalDistance));
      setTime(Math.round((summary.totalDistance / 15e3) * 60));
      console.log(
        "Total distance is " +
          Math.round(summary.totalDistance) +
          " meters and total time is " +
          Math.round((summary.totalDistance / 15e3) * 60) +
          " minutes",
      );
      console.log(
        "Total distance is " +
          Math.round(summary.totalDistance) +
          " meters and total time is " +
          Math.round((summary.totalTime % 3600) / 60) +
          " minutes",
      );
    });

    return instance;
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

  const RoutingMachine = createControlComponent(createRoutineMachineLayer);

  return (
    <section className={"w-full"}>
      <Toaster richColors />
      <section className="flex flex-col gap-3 my-3 justify-center items-center sm:flex-row">
        <StationSelector
          label={"Starting"}
          stations={stations}
          selectHandler={startingStationHandler}
          selectedStation={selectedStations.starting}
        />
        <StationSelector
          label={"Arrival"}
          stations={stations}
          selectHandler={arrivalStationHandler}
          selectedStation={selectedStations.arrival}
        />
        <section className="flex gap-2 w-full">
          <Button
            color="default"
            onClick={clearHandler}
            isDisabled={!selectedStations.starting && !selectedStations.arrival}
          >
            <Trash /> Clear
          </Button>
          <Button
            color="primary"
            className={"grow"}
            onClick={handleClickSave}
            isDisabled={!selectedStations.starting || !selectedStations.arrival}
          >
            <Save /> Save travel
          </Button>
        </section>
      </section>
      <section className="relative h-full aspect-square w-full sm:h-screen sm:aspect-auto sm:max-h-[48rem]">
        {isLoading && <Loader />}
        <StationMap
          stations={stations}
          RoutingMachine={RoutingMachine}
          startingStation={selectedStations.starting}
          arrivalStation={selectedStations.arrival}
        />
      </section>
    </section>
  );
};

interface StationMapProps {
  stations: Station[];
}

const StationMap: FC<StationMapProps> = ({
  stations,
  RoutingMachine,
  startingStation,
  arrivalStation,
}) => {
  return (
    <Card className="flex justify-center items-center w-full h-full basis-72 grow aspect-square space-y-2">
      <MapContainer
        className="h-full w-full aspect-square z-0"
        center={[48.8566, 2.3522]}
        zoom={12}
        maxZoom={18}
        minZoom={10}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {startingStation && arrivalStation ? (
          <SelectedStationMarker
            startingStation={startingStation}
            arrivalStation={arrivalStation}
          />
        ) : (
          <StationMarkerList stations={stations} />
        )}
        {startingStation && arrivalStation && <RoutingMachine />}
      </MapContainer>
    </Card>
  );
};
