import { Station } from "./station-types.ts";
import { FC } from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface Props {
  label: string;
  stations: Station[];
  selectHandler: (station: Station) => void;
  selectedStation: Station | null;
}

export const StationSelector: FC<Props> = ({
  label,
  stations,
  selectHandler,
  selectedStation,
}) => {
  return (
    <Select
      label={label}
      placeholder="Select a station"
      className="flex w-full"
      selectedKeys={
        new Set(selectedStation ? [selectedStation?.stationcode] : [])
      }
    >
      {stations.map((station) => (
        <SelectItem
          key={station.stationcode}
          value={station.name}
          onClick={() => selectHandler(station)}
        >
          {station.name}
        </SelectItem>
      ))}
    </Select>
  );
};
