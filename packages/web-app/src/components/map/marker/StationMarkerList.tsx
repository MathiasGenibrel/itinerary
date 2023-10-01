import { Station } from "../station-types.ts";
import { FC } from "react";
import { MarkerPoint } from "./Marker.tsx";

interface StationMarkerListProps {
  stations: Station[];
}

export const StationMarkerList: FC<StationMarkerListProps> = ({ stations }) => {
  return stations.map((station) => (
    <MarkerPoint station={station} key={station.stationcode} />
  ));
};
