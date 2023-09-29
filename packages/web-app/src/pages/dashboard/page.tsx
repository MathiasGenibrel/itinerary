import { TravelCardList } from "../../components/dashboard/Card/TravelCard.tsx";
import { GeoAlt, Stopwatch } from "react-bootstrap-icons";
import { SectionWrapper } from "../../components/dashboard/SectionWrapper.tsx";
import { StatCard } from "../../components/dashboard/Card/StatCard.tsx";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { SkeletonTravelCardList } from "../../components/dashboard/Card/SkeletonTravelCard.tsx";
import { ErrorLoadingModal } from "../../components/dashboard/ErrorLoadingModal.tsx";
import { useLoadingTravels } from "../../components/dashboard/useLoadingTravels.tsx";

export default function Page() {
  const { user, notifyUser, onOpenChange, isOpen, travels, isLoading } =
    useLoadingTravels();

  /* TODO add business logic
   * - Need to validate TravelMemoryRepository
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

  useEffect(() => {
    notifyUser();
  }, []);

  return (
    <>
      <Toaster richColors />
      <ErrorLoadingModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        notifyUser={notifyUser}
      />
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
        <SectionWrapper title={`Travel (${travels.length})`}>
          <section className="flex flex-wrap gap-6 justify-center">
            {isLoading ? (
              <SkeletonTravelCardList />
            ) : (
              <TravelCardList travels={travels} />
            )}
          </section>
        </SectionWrapper>
      </article>
    </>
  );
}
