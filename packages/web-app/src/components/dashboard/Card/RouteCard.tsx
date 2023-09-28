import { Image } from "@nextui-org/image";
import { CardFooter } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Download } from "react-bootstrap-icons";
import { FC } from "react";
import { Itinerary } from "@shared/contract/itinerary.ts";
import { Card } from "@nextui-org/card";
import { DropdownOptions } from "./DropdownOptions.tsx";

interface Props {
  itinerary: Itinerary;
}

export const RouteCard: FC<Props> = ({ itinerary }) => {
  return (
    <Card
      key={itinerary.id}
      isFooterBlurred
      radius="lg"
      className="border-none w-fit basis-72	grow"
    >
      <Image
        alt="Woman listing to music"
        className="object-cover w-full aspect-square"
        src="/map_background.jpg"
      />
      <CardFooter className="justify-between gap-4 bg-black/30 border-white/20 border-1 overflow-hidden py-1 absolute rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-sm font-semibold text-white/80 truncate">
          {itinerary.name}
        </p>
        <section className={"flex gap-2"}>
          <Button
            className="text-tiny"
            color="success"
            radius="lg"
            size="sm"
            startContent={<Download />}
          >
            Download
          </Button>
          <DropdownOptions />
        </section>
      </CardFooter>
    </Card>
  );
};
