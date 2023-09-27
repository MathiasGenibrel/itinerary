import React from 'react';
import { Itinerary } from '@shared/contract/itinerary';
import { Card, CardBody, CardHeader, CardFooter } from '@nextui-org/react';
import { Pencil, Trash, Geo } from 'react-bootstrap-icons';
import { ItineraryRepository } from '../../helpers/repository/itinerary/ItineraryRepository';
import { ItineraryMemoryRepository } from '../../helpers/repository/itinerary/ItineraryMemoryRepository';

export default function Page() {
  const itineraryService: ItineraryRepository = new ItineraryMemoryRepository();

  const itineraries: Itinerary[] = [
    {
      id: 1,
      name: 'Parcours 1',
      points: [
        { lat: '10', lon: '10' },
        { lat: '1000', lon: '1' },
        { lat: '100', lon: '10' },
      ],
    },
    {
      id: 2,
      name: 'Mon parcours',
      points: [{ lat: '100', lon: '100' }],
    },
    {
      id: 3,
      name: '2e parcours',
      points: [{ lat: '20', lon: '20' }],
    },
    {
      id: 4,
      name: 'Random parcours',
      points: [{ lat: '50', lon: '100' }],
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
      <p>Dashboard</p>
      <h1>Itineraries list</h1>
      <div className="flex p-3 space-x-5 justify-center">
        {itineraries.map((itinerary) => (
          <Card className="flex w-96">
            <CardHeader>
              <Geo className="flex mr-2 text-red-500 text-xl" />
              <p className="flex font-bold">{itinerary.name}</p>
            </CardHeader>
            <CardFooter className="flex justify-around">
              <div
                className="flex p-5 rounded-3xl bg-yellow-400"
                onClick={() => handleClickEdit(itinerary)}
              >
                <Pencil className="flex"></Pencil>
              </div>
              <div
                className="flex p-5 rounded-3xl bg-red-400"
                onClick={() => handleClickDelete(itinerary)}
              >
                <Trash className="flex"></Trash>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
