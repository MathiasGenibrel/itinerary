import { Itinerary } from "@shared/contract/itinerary";
import { Card, CardFooter } from "@nextui-org/react";
import { ItineraryRepository } from "../../helpers/repository/itinerary/ItineraryRepository";
import { ItineraryMemoryRepository } from "../../helpers/repository/itinerary/ItineraryMemoryRepository";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import {
  Download,
  InfoCircle,
  Pencil,
  ThreeDotsVertical,
  Trash,
} from "react-bootstrap-icons";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser().tsx";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";

export default function Page() {
  const user = useAuthenticatedUser();
  const itineraryService: ItineraryRepository = new ItineraryMemoryRepository();

  const itineraries: Itinerary[] = [
    {
      id: 1,
      name: "Lorem ipsum idate numpilus que vida",
      points: [
        { lat: "10", lon: "10" },
        { lat: "1000", lon: "1" },
        { lat: "100", lon: "10" },
      ],
    },
    {
      id: 2,
      name: "Mon parcours",
      points: [{ lat: "100", lon: "100" }],
    },
    {
      id: 3,
      name: "2e parcours",
      points: [{ lat: "20", lon: "20" }],
    },
    {
      id: 4,
      name: "Random parcours",
      points: [{ lat: "50", lon: "100" }],
    },
  ];

  const handleClickEdit = async (itinerary: Itinerary) => {
    await itineraryService.edit(itinerary);
  };

  const handleClickDelete = async (itinerary: Itinerary) => {
    await itineraryService.delete({ id: itinerary.id });
  };

  return (
    <>
      <article className={"flex flex-col gap-4"}>
        <h1 className={"text-xl w-full"}>
          Bonjour <span className={"font-semibold"}>{user.username}.</span>
        </h1>
        <section className="flex flex-wrap gap-6 justify-center">
          {itineraries.map((itinerary) => (
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
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        className="text-tiny text-white"
                        color="default"
                        variant={"light"}
                        radius="lg"
                        size="sm"
                        isIconOnly
                        startContent={
                          <ThreeDotsVertical size={16} title={"Options"} />
                        }
                      ></Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      variant="faded"
                      aria-label="Dropdown menu with icons"
                    >
                      <DropdownItem key="new" startContent={<InfoCircle />}>
                        Info
                      </DropdownItem>
                      <DropdownItem key="copy" startContent={<Pencil />}>
                        Edit
                      </DropdownItem>
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        variant={"solid"}
                        startContent={<Trash />}
                      >
                        Delete route
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </section>
              </CardFooter>
            </Card>
          ))}
        </section>
      </article>
    </>
  );
}
