import { Image } from "@nextui-org/image";
import { CardFooter } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Download } from "react-bootstrap-icons";
import { FC } from "react";
import { Travel } from "@shared/contract/travel.ts";
import { Card } from "@nextui-org/card";
import { DropdownOptions } from "./DropdownOptions.tsx";

interface Props {
  travel: Travel;
}

export const RouteCard: FC<Props> = ({ travel }) => {
  return (
    <Card
      key={travel.id}
      isFooterBlurred
      radius="lg"
      className="border-none w-fit basis-72	grow itinerary-card"
    >
      <Image
        alt=""
        className="object-cover w-full max-w-full max-h-96"
        src="/map_background.jpg"
      />
      <CardFooter className="justify-between gap-4 bg-black/30 border-white/20 border-1 overflow-hidden py-1 absolute rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-sm font-semibold text-white/80 truncate">
          {travel.name}
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
