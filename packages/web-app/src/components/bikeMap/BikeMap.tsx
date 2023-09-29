import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Bicycle, PCircle, Map } from 'react-bootstrap-icons';
import { Button } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/react';
import 'leaflet-routing-machine';
import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';

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
        const response = await fetch('http://localhost:3001/api/bike-data');
        const data = await response.json();
        setBikeData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching bike data', error);
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
          firstSelectedStation?.coordonnees_geo?.lon || 0
        ),
        L.latLng(
          secondSelectedStation?.coordonnees_geo?.lat || 0,
          secondSelectedStation?.coordonnees_geo?.lon || 0
        ),
      ],
    });
    console.log(L.Routing.Plan);

    instance.on('routesfound', function (e) {
      const [startPoint, endPoint] = e.routes;
      const summary = startPoint.summary;
      // alert distance and time in km and minutes
      console.log(
        'Total distance is ' +
          Math.round(summary.totalDistance) +
          ' meters and total time is ' +
          Math.round((summary.totalDistance / 15e3) * 60) +
          ' minutes'
      );
      console.log(
        'Total distance is ' +
          Math.round(summary.totalDistance) +
          ' meters and total time is ' +
          Math.round((summary.totalTime % 3600) / 60) +
          ' minutes'
      );
      // console.log('routes', routes);
    });

    return instance;
  };

  const test = () => {
    const p1 = new L.LatLng(
      firstSelectedStation?.coordonnees_geo.lat || 0,
      firstSelectedStation?.coordonnees_geo.lon || 0
    );
    const p2 = new L.LatLng(
      secondSelectedStation?.coordonnees_geo.lat || 0,
      secondSelectedStation?.coordonnees_geo.lon || 0
    );
    console.log(p1.distanceTo(p2) * 1);
  };

  const RoutingMachine = createControlComponent(createRoutineMachineLayer);
  // console.log(RoutingMachine);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <div className="flex gap-3 m-3 justify-center items-center">
        <Select
          label="Departure"
          placeholder="Select a station"
          className="flex max-w-xs"
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
          className="flex max-w-xs"
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
          onClick={() => {
            handleClickGenerate();
            test();
          }}
        >
          <Map /> Generate itinerary
        </Button>
      </div>
      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={13}
        style={{ height: '500px', width: '100%' }}
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
    </div>
  );
};

export default BikeMap;
