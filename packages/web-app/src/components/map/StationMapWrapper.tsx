import React, { FC, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Bicycle, Map, PCircle } from "react-bootstrap-icons";
import { Button, Select, SelectItem } from "@nextui-org/react";
import "leaflet-routing-machine";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import { Card } from "@nextui-org/card";
import { Station } from "./station-types.ts";

export const StationMapWrapper: React.FC = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [startingStation, setStartingStation] = React.useState<Station | null>(
    null,
  );
  const [arrivalStation, setArrivalStation] = React.useState<Station | null>(
    null,
  );

  useEffect(() => {
    const fetchBikeData = async () => {
      try {
        const response = await fetch("http://localhost:4001/api/bike-data");
        const data = await response.json();
        setStations(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching bike data", error);
      }
    };
    fetchBikeData();
  }, []);

  /*
  TODO: Open a Modal when a user click on "SAVE":
    - User is connected => Modal with form to choose the name of travel, with two button => [SaveAndClose, SaveAndDownload]
    - User is not connected => Modal to logging-in or create an account, and after that, open the modal to save travel
   */
  const handleClickSave = async () => {
    try {
      const inputs = {
        name: `${startingStation?.name} / ${arrivalStation?.name}`,
        startPoint: startingStation?.stationcode,
        endPoint: arrivalStation?.stationcode,
        distance: distance,
        time: time,
        idUser: 1,
      };
      const response = await fetch("http://localhost:4001/api/travel/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error saving itinerary", error);
    }
  };

  const [distance, setDistance] = useState<number>(0);
  const [time, setTime] = useState<number>(0);

  const createRoutineMachineLayer = () => {
    const instance = L.Routing.control({
      waypoints: [
        L.latLng(
          startingStation?.coordonnees_geo?.lat || 0,
          startingStation?.coordonnees_geo?.lon || 0,
        ),
        L.latLng(
          arrivalStation?.coordonnees_geo?.lat || 0,
          arrivalStation?.coordonnees_geo?.lon || 0,
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

  const RoutingMachine = createControlComponent(createRoutineMachineLayer);

  return (
    <div className={"w-full"}>
      <div className="flex flex-col gap-3 my-3 justify-center items-center sm:flex-row">
        <Select
          label="Departure"
          placeholder="Select a station"
          className="flex w-full"
        >
          {stations.map((station) => (
            <SelectItem
              key={station.stationcode}
              value={station.name}
              onClick={() => setStartingStation(station)}
            >
              {station.name}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Arrival"
          placeholder="Select a station"
          className="flex w-full"
        >
          {stations.map((station) => (
            <SelectItem
              key={station.stationcode}
              value={station.name}
              onClick={() => setArrivalStation(station)}
            >
              {station.name}
            </SelectItem>
          ))}
        </Select>
        <Button color="primary" className={"w-full"} onClick={handleClickSave}>
          <Map /> Save itinerary
        </Button>
      </div>
      <StationMap
        stations={stations}
        RoutingMachine={RoutingMachine}
        startingStation={startingStation}
        arrivalStation={arrivalStation}
      />
    </div>
  );
};

interface StationMapProps {
  stations: Station[];
}

export const StationMap: FC<StationMapProps> = ({
  stations,
  RoutingMachine,
  startingStation,
  arrivalStation,
}) => {
  return (
    <Card>
      <MapContainer
        className={
          "h-full aspect-square w-full sm:h-screen sm:aspect-auto sm:max-h-[48rem]"
        }
        center={[48.8566, 2.3522]}
        zoom={13}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {stations.map((station, index) => (
          <Marker
            key={index}
            position={[
              station.coordonnees_geo.lat,
              station.coordonnees_geo.lon,
            ]}
          >
            <Popup>
              <div>
                <h3>{station.name}</h3>
                <p>Total capacity: {station.capacity}</p>
                <p className="flex gap-1">
                  <Bicycle />
                  {station.numbikesavailable} Bicycles
                </p>
                <p className="flex gap-1">
                  <PCircle />
                  {station.numdocksavailable} Places
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
        {startingStation && arrivalStation && <RoutingMachine />}
      </MapContainer>
    </Card>
  );
};
