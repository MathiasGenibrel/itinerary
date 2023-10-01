import { FC } from "react";
import { Marker, Popup } from "react-leaflet";
import { Bicycle, PCircle } from "react-bootstrap-icons";
import { Station } from "../station-types.ts";

interface MarkerPointProps {
  station: Station;
}

export const MarkerPoint: FC<MarkerPointProps> = ({ station }) => {
  return (
    <Marker
      key={station.stationcode}
      position={[station.coordonnees_geo.lat, station.coordonnees_geo.lon]}
    >
      <Popup>
        <>
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
        </>
      </Popup>
    </Marker>
  );
};
