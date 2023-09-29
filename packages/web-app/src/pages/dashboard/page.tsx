import { Itinerary } from '@shared/contract/itinerary';
import { ItineraryRepository } from '../../helpers/repository/itinerary/ItineraryRepository';
import { ItineraryMemoryRepository } from '../../helpers/repository/itinerary/ItineraryMemoryRepository';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser.tsx';
import { RouteCard } from '../../components/dashboard/Card/RouteCard.tsx';
import { GeoAlt, Stopwatch } from 'react-bootstrap-icons';
import { SectionWrapper } from '../../components/dashboard/SectionWrapper.tsx';
import { StatCard } from '../../components/dashboard/Card/StatCard.tsx';
import { useEffect, useState } from 'react';

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

  const empty = [
    {
      id: 0,
      name: '',
      startPoint: { lat: '1', lon: '1' },
      endPoint: { lat: '2', lon: '2' },
    },
  ];
  const [itineraries, setItineraries] = useState(empty);

  useEffect(() => {
    const fetchAllTravel = async () => {
      try {
        const response = await fetch(
          `http://localhost:4001/api/travel/all/${user.id}`
        );
        const data = await response.json();
        setItineraries(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllTravel();
  }, []);

  // const itineraries: Itinerary[] = [
  //   {
  //     id: 1,
  //     name: 'Lorem ipsum idate numpilus que vida',
  //     startPoint: { lat: '10', lon: '10' },
  //     endPoint: { lat: '1000', lon: '1' },
  //   },
  //   {
  //     id: 2,
  //     name: 'Mon parcours',
  //     startPoint: { lat: '10', lon: '10' },
  //     endPoint: { lat: '100', lon: '14' },
  //   },
  //   {
  //     id: 3,
  //     name: '2e parcours',
  //     startPoint: { lat: '104', lon: '100' },
  //     endPoint: { lat: '100', lon: '141' },
  //   },
  //   {
  //     id: 4,
  //     name: 'Random parcours',
  //     startPoint: { lat: '1.14', lon: '10.4114' },
  //     endPoint: { lat: '14.141', lon: '17.1414' },
  //   },
  // ];

  // const handleClickEdit = async (itinerary: Itinerary) => {
  //   await itineraryService.edit(itinerary);
  // };
  //
  // const handleClickDelete = async (itinerary: Itinerary) => {
  //   await itineraryService.delete({ id: itinerary.id });
  // };

  return (
    <article className={'flex flex-col gap-6 pt-4'}>
      <h1 className={'text-xl w-full'}>
        Hello <span className={'font-semibold'}>{user.username}. 👋</span>
      </h1>

      <SectionWrapper title="Total">
        <section className="flex flex-wrap gap-4 sm:gap-8">
          <StatCard
            icon={<GeoAlt className="text-warning" size={16} />}
            title={'distance'}
            statistic={{ unit: 'km', value: '104' }}
          />
          <StatCard
            icon={<Stopwatch className="text-warning" size={16} />}
            title={'time'}
            statistic={{ unit: 'h', value: '19:35' }}
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
  );
}
