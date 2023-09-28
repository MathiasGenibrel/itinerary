import { Itinerary } from "@shared/contract/itinerary";
import { ItineraryRepository } from "../../helpers/repository/itinerary/ItineraryRepository";
import { ItineraryMemoryRepository } from "../../helpers/repository/itinerary/ItineraryMemoryRepository";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser().tsx";
import { RouteCard } from "../../components/dashboard/Card/RouteCard.tsx";
import { GeoAlt, Stopwatch } from "react-bootstrap-icons";
import { SectionWrapper } from "../../components/dashboard/SectionWrapper.tsx";
import { StatCard } from "../../components/dashboard/Card/StatCard.tsx";

export default function Page() {
  const user = useAuthenticatedUser();

  /* TODO add business logic
   * - Need to validate ItineraryMemoryRepository
   * - Need to add toaster for PDF download
   * - Need to add each handler:
   *  - Download button handler
   *  - Info button handler
   *  - Edit button handler
   *  - Delete button handler
   *
   * - Inspect if we need a context for the travel generation.
   * - e.g. => When user press on edit, client navigate to ApplicationPath.HOME and he see his selected travel
   */

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

  // const handleClickEdit = async (itinerary: Itinerary) => {
  //   await itineraryService.edit(itinerary);
  // };
  //
  // const handleClickDelete = async (itinerary: Itinerary) => {
  //   await itineraryService.delete({ id: itinerary.id });
  // };

  return (
    <>
      <article className={"flex flex-col gap-6 pt-4"}>
        <h1 className={"text-xl w-full"}>
          Hello <span className={"font-semibold"}>{user.username}. 👋</span>
        </h1>

        <SectionWrapper title="Total">
          <section className="flex flex-wrap gap-4">
            <StatCard
              icon={<GeoAlt className="text-warning" size={16} />}
              title={"distance"}
              statistic={{ unit: "km", value: "104" }}
            />
            <StatCard
              icon={<Stopwatch className="text-warning" size={16} />}
              title={"distance"}
              statistic={{ unit: "h", value: "19:35" }}
            />
          </section>
        </SectionWrapper>

        <SectionWrapper title={`Travel (${itineraries.length})`}>
          <section className="flex flex-wrap gap-6 justify-center">
            {itineraries.map((itinerary) => (
              <RouteCard itinerary={itinerary} key={itinerary.id} />
            ))}
          </section>
        </SectionWrapper>
      </article>
    </>
  );
}
