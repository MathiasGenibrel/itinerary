import { FC, useEffect } from "react";
import { Save, Trash } from "react-bootstrap-icons";
import { Button } from "@nextui-org/react";
import { useStation } from "./hooks/useStation.tsx";
import { Toaster } from "sonner";
import { Loader } from "./Loader.tsx";
import { StationSelector } from "./StationSelector.tsx";
import { StationMap } from "./StationMap.tsx";
import { useSelectedStation } from "./hooks/useSelectedStation.tsx";

export const StationMapWrapper: FC = () => {
  const { stations, isLoading, toastHandler } = useStation();
  const {
    selectedStations,
    saveStationHandler,
    arrivalStationHandler,
    startingStationHandler,
    clearHandler,
  } = useSelectedStation();

  useEffect(() => {
    toastHandler();
  }, []);

  /*
  TODO: Open a Modal when a auth click on "SAVE":
    - User is connected => Modal with form to choose the name of travel, with two button => [SaveAndClose, SaveAndDownload]
    - User is not connected => Modal to logging-in or create an account, and after that, open the modal to save travel
   */

  return (
    <section className={"w-full"}>
      <Toaster richColors />
      <section className="flex flex-col gap-3 my-3 justify-center items-center sm:flex-row">
        <StationSelector
          label={"Starting"}
          stations={stations}
          selectHandler={startingStationHandler}
          selectedStation={selectedStations.starting}
        />
        <StationSelector
          label={"Arrival"}
          stations={stations}
          selectHandler={arrivalStationHandler}
          selectedStation={selectedStations.arrival}
        />
        <section className="flex gap-2 w-full">
          <Button
            color="default"
            onClick={clearHandler}
            isDisabled={!selectedStations.starting && !selectedStations.arrival}
          >
            <Trash /> Clear
          </Button>
          <Button
            color="primary"
            className={"grow"}
            onClick={saveStationHandler}
            isDisabled={!selectedStations.starting || !selectedStations.arrival}
          >
            <Save /> Save travel
          </Button>
        </section>
      </section>
      <section className="relative h-full aspect-square w-full sm:h-screen sm:aspect-auto sm:max-h-[48rem]">
        {isLoading && <Loader />}
        <StationMap
          stations={stations}
          startingStation={selectedStations.starting}
          arrivalStation={selectedStations.arrival}
        />
      </section>
    </section>
  );
};
