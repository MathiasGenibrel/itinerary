import { Station } from "./station-types.ts";
import { FC } from "react";
import L, { LatLng } from "leaflet";
import "leaflet-routing-machine";
import { createControlComponent } from "@react-leaflet/core";
import { useMap } from "react-leaflet";

interface Props {
  starting: Station;
  arrival: Station;
}

interface Instruction {
  direction: string;
  distance: number;
  index: number;
  mode: string;
  modifier: string;
  road: string;
  text: string;
  time: number;
  type: string;
  exit?: boolean;
}

interface Summary {
  totalDistance: number;
  totalTime: number;
}

interface Route {
  coordinates: LatLng[];
  instructions: Instruction[];
  name: string;
  properties: {
    isSimplified: boolean;
  };
  routeIndex: number;
  summary: Summary;
  waypointIndice: number[];
}

export const RoutingService: FC<Props> = ({ starting, arrival }) => {
  const map = useMap();
  const createRoutineMachineLayer = () => {
    const instance = L.Routing.control({
      waypoints: [
        L.latLng(starting.coordonnees_geo.lat, starting.coordonnees_geo.lon),
        L.latLng(arrival.coordonnees_geo.lat, arrival.coordonnees_geo.lon),
      ],
    });

    // Move the camera to selected stations.
    map.flyToBounds(
      [
        [starting.coordonnees_geo.lat, starting.coordonnees_geo.lon],
        [arrival.coordonnees_geo.lat, arrival.coordonnees_geo.lon],
      ],
      {
        padding: [50, 50],
      },
    );

    // Event lister on routesfound event.
    instance.on("routesfound", ({ routes }: { routes: Route[] }) => {
      console.log(routes);
      // At present, we only take the first route into account, and don't offer the other paths to the user.
      const [route] = routes;
      const summary = route.summary;

      console.log("SUMMARY: ", summary);
    });

    return instance;
  };

  const RoutingMachine = createControlComponent(createRoutineMachineLayer);

  return <RoutingMachine />;
};
