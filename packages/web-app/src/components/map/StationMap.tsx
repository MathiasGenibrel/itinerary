import { FC } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@nextui-org/card";
import { Station } from "./station-types.ts";
import { SelectedStationMarker } from "./marker/SelectedStationMarker.tsx";
import { StationMarkerList } from "./marker/StationMarkerList.tsx";
import { RoutingService } from "./RoutingService.tsx";

interface StationMapProps {
  stations: Station[];
  startingStation: Station | null;
  arrivalStation: Station | null;
}

export const StationMap: FC<StationMapProps> = ({
  stations,
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
          <>
            <SelectedStationMarker
              startingStation={startingStation}
              arrivalStation={arrivalStation}
            />
            <RoutingService
              starting={startingStation}
              arrival={arrivalStation}
            />
          </>
        ) : (
          <StationMarkerList stations={stations} />
        )}
      </MapContainer>
    </Card>
  );
};
