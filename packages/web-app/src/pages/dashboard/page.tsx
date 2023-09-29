import { TravelRepository } from "../../helpers/repository/travel/TravelRepository.ts";
import { TravelMemoryRepository } from "../../helpers/repository/travel/TravelMemoryRepository.ts";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser.tsx";
import { RouteCard } from "../../components/dashboard/Card/RouteCard.tsx";
import { GeoAlt, Stopwatch } from "react-bootstrap-icons";
import { SectionWrapper } from "../../components/dashboard/SectionWrapper.tsx";
import { StatCard } from "../../components/dashboard/Card/StatCard.tsx";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { Travel } from "@shared/contract/travel.ts";
import { Skeleton } from "@nextui-org/react";
import { Card } from "@nextui-org/card";

const travelService: TravelRepository = new TravelMemoryRepository();

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
  const [travels, setTravels] = useState<Travel[]>([]);
  const [isLoading, setLoader] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);

  useEffect(() => {
    toast.promise(
      async () => {
        return await travelService.getAll(user.id);
      },
      {
        loading: "Travels are loading",
        success: (data) => {
          setTravels(data);
          setLoader(false);
          setError(false);
          return "Travels have been recovered";
        },
        error: (error: Error) => {
          setTravels([]);
          setError(true);
          setLoader(false);
          return error.message;
        },
      },
    );
  }, []);

  return (
    <>
      <Toaster richColors />
      <article className={"flex flex-col gap-6 pt-4 min-h-full"}>
        <h1 className={"text-xl w-full"}>
          Hello <span className={"font-semibold"}>{user.username}. 👋</span>
        </h1>

        <SectionWrapper title="Total">
          <section className="flex flex-wrap gap-4 sm:gap-8">
            <StatCard
              icon={<GeoAlt className="text-warning" size={16} />}
              title={"distance"}
              statistic={{ unit: "km", value: "104" }}
            />
            <StatCard
              icon={<Stopwatch className="text-warning" size={16} />}
              title={"time"}
              statistic={{ unit: "h", value: "19:35" }}
            />
          </section>
        </SectionWrapper>

        {isError && "hello"}

        {isLoading ? (
          <Card className="w-full basis-72 grow aspect-square space-y-2">
            <Skeleton className="h-full rounded-lg">
              <div className="h-full rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="flex gap-2 p-2">
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-6 w-full rounded-lg bg-default-300"></div>
              </Skeleton>
              <Skeleton className="w-1/5 rounded-lg">
                <div className="h-6 w-full rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </Card>
        ) : (
          !isError && (
            <SectionWrapper title={`Travel (${travels.length})`}>
              <section className="flex flex-wrap gap-6 justify-center">
                {travels.map((travel) => (
                  <RouteCard travel={travel} key={travel.id} />
                ))}
              </section>
            </SectionWrapper>
          )
        )}
      </article>
    </>
  );
}
