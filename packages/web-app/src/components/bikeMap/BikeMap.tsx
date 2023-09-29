import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Bicycle, Map, PCircle } from "react-bootstrap-icons";
import { Button, Select, SelectItem } from "@nextui-org/react";
import "leaflet-routing-machine";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import { Card } from "@nextui-org/card";

interface BikeStation {
  stationcode: string;
  name: string;
  is_installed: string;
  capacity: number;
  numdocksavailable: number;
  numbikesavailable: number;
  mechanical: number;
  ebike: number;
  is_renting: string;
  is_returning: string;
  duedate: string;
  coordonnees_geo: {
    lon: number;
    lat: number;
  };
  nom_arrondissement_communes: string;
  code_insee_commune: null | number;
}

const BikeMap: React.FC = () => {
  const [bikeData, setBikeData] = useState<BikeStation[]>([]);
  const [firstSelectedStation, setFirstSelectedStation] =
    React.useState<BikeStation>();
  const [secondSelectedStation, setSecondSelectedStation] =
    React.useState<BikeStation>();

  useEffect(() => {
    const fetchBikeData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/bike-data");
        const data = await response.json();
        setBikeData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching bike data", error);
      }
    };
    fetchBikeData();
  }, []);

  const handleClickGenerate = async () => {};

  // const createRoutineMachineLayer = (props) => {
  //   const instance = L.Routing.control({
  //     waypoints: [
  //       L.latLng(
  //         firstSelectedStation?.coordonnees_geo?.lat || 0,
  //         firstSelectedStation?.coordonnees_geo?.lon || 0
  //       ),
  //       L.latLng(
  //         secondSelectedStation?.coordonnees_geo?.lat || 0,
  //         secondSelectedStation?.coordonnees_geo?.lon || 0
  //       ),
  //     ],
  //   });

  //   return instance;
  // };

  const createRoutineMachineLayer = (props) => {
    const instance = L.Routing.control({
      waypoints: [
        L.latLng(
          firstSelectedStation?.coordonnees_geo?.lat || 0,
          firstSelectedStation?.coordonnees_geo?.lon || 0,
        ),
        L.latLng(
          secondSelectedStation?.coordonnees_geo?.lat || 0,
          secondSelectedStation?.coordonnees_geo?.lon || 0,
        ),
      ],
    });
    console.log(L.Routing.Plan);
    return instance;
  };

  const test = () => {
    const p1 = new L.LatLng(
      firstSelectedStation?.coordonnees_geo.lat || 0,
      firstSelectedStation?.coordonnees_geo.lon || 0,
    );
    const p2 = new L.LatLng(
      secondSelectedStation?.coordonnees_geo.lat || 0,
      secondSelectedStation?.coordonnees_geo.lon || 0,
    );
    console.log(p1.distanceTo(p2) * 1);
  };

  const RoutingMachine = createControlComponent(createRoutineMachineLayer);
  // console.log(RoutingMachine);

  return (
    <div className={"w-full"}>
      <div className="flex flex-col gap-3 my-3 justify-center items-center sm:flex-row">
        <Select
          label="Departure"
          placeholder="Select a station"
          className="flex w-full"
        >
          {bikeData.map((station) => (
            <SelectItem
              key={station.stationcode}
              value={station.name}
              onClick={() => setFirstSelectedStation(station)}
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
          {bikeData.map((station) => (
            <SelectItem
              key={station.stationcode}
              value={station.name}
              onClick={() => setSecondSelectedStation(station)}
            >
              {station.name}
            </SelectItem>
          ))}
        </Select>
        <Button
          color="primary"
          className={"w-full"}
          onClick={() => {
            handleClickGenerate();
            test();
          }}
        >
          <Map /> Generate itinerary
        </Button>
      </div>
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
          {bikeData.map((bikeStation, index) => (
            <Marker
              key={index}
              position={[
                bikeStation.coordonnees_geo.lat,
                bikeStation.coordonnees_geo.lon,
              ]}
            >
              <Popup>
                <div>
                  <h3>{bikeStation.name}</h3>
                  <p>Total capacity: {bikeStation.capacity}</p>
                  <p className="flex gap-1">
                    <Bicycle />
                    {bikeStation.numbikesavailable} Bicycles
                  </p>
                  <p className="flex gap-1">
                    <PCircle />
                    {bikeStation.numdocksavailable} Places
                  </p>
                  <p className="flex gap-1">
                    <PCircle />
                    {bikeStation.coordonnees_geo.lat} LAT
                  </p>
                  <p className="flex gap-1">
                    <PCircle />
                    {bikeStation.coordonnees_geo.lon} LON
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
          {firstSelectedStation && secondSelectedStation && <RoutingMachine />}
        </MapContainer>
      </Card>
    </div>
  );
};

export default BikeMap;
