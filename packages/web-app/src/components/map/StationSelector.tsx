import { Station } from "./station-types.ts";
import { ChangeEvent, FC, useState } from "react";
import { Select, Selection, SelectItem } from "@nextui-org/react";

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
  const [value, setValue] = useState<Selection>(new Set([]));

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log("[TARGET VALUE]: ", e.target.value);
    setValue(new Set([e.target.value]));
  };

  console.log(value);
  console.log(selectedStation?.stationcode);

  return (
    <Select
      label={label}
      placeholder="Select a station"
      className="flex w-full"
      selectedKeys={new Set(selectedStation?.stationcode ?? [])}
      onChange={handleSelectionChange}
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
