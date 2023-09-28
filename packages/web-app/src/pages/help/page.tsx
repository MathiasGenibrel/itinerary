import { Image } from "@nextui-org/image";
import { Card } from "@nextui-org/card";
import { CardFooter } from "@nextui-org/react";
import { Button } from "@nextui-org/button";

export default function Page() {
  return (
    <Card isFooterBlurred radius="lg" className="border-none w-fit mx-auto">
      <Image
        alt="Developper work on this feature"
        className="object-cover"
        src="/wip.png"
        height={400}
        width={400}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80">Site is under construction</p>
        <Button
          className="text-tiny text-white bg-black/20"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
        >
          Notify me
        </Button>
      </CardFooter>
    </Card>
  );
}
