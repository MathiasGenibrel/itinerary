import { Station } from "../station-types.ts";
import { FC } from "react";
import { MarkerPoint } from "./Marker.tsx";

interface SelectedStationMarkerProps {
  startingStation: Station;
  arrivalStation: Station;
}

export const SelectedStationMarker: FC<SelectedStationMarkerProps> = ({
  startingStation,
  arrivalStation,
}) => {
  return (
    <>
      <MarkerPoint station={startingStation} />
      <MarkerPoint station={arrivalStation} />
    </>
  );
};
