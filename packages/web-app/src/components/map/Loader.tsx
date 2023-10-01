import { Spinner } from "@nextui-org/react";
import { Card } from "@nextui-org/card";

export const Loader = () => (
  <Card className="absolute bg-black/60 z-50 flex justify-center items-center w-full basis-72 grow aspect-square space-y-2">
    <Spinner size={"lg"} color="white" />
  </Card>
);
