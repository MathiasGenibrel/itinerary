import { TravelRepository } from "./TravelRepository.ts";
import { FakeTimeout } from "../../FakeTimeout.ts";
import {
  Travel,
  TravelEntity,
  TravelRequestUpdate,
} from "@shared/contract/travel.ts";
import { LoginResponse } from "@shared/contract/auth.ts";
import { faker, fakerFR } from "@faker-js/faker";
import { Station } from "../../../components/map/station-types.ts";
import { stations } from "../../../mocks/stations.ts";

let travels: TravelEntity[] = [
  {
    id: 7309061536088064,
    startPoint: "stationCode",
    endPoint: "stationCode",
    distance: "9932",
    time: 39.728,
    name: "Voie Lepic",
    idUser: 1,
  },
  {
    id: 2232839483424768,
    startPoint: "stationCode",
    endPoint: "stationCode",
    distance: "3118.1",
    time: 12.4724,
    name: "Quai de la Paix",
    idUser: 1,
  },
  {
    id: 5246951532527616,
    startPoint: "stationCode",
    endPoint: "stationCode",
    distance: "13260.5",
    time: 53.042,
    name: "Rue La Boétie",
    idUser: 1,
  },
];

export class TravelMemoryRepository
  extends FakeTimeout
  implements TravelRepository
{
  private readonly percentageSuccessRating: number = 1;

  public async create(
    travel: TravelRequestUpdate,
    userID: LoginResponse["id"],
  ): Promise<void> {
    await this.delay();

    if (!this.isSuccessful())
      throw new Error("An error occurred with your request, Try again later");

    travels.push({
      ...travel,
      id: faker.number.int(),
      idUser: userID,
    });

    return;
  }

  public async getStations(): Promise<Station[]> {
    await this.delay();

    if (!this.isSuccessful())
      throw new Error("An error occurred with your request, Try again later");
    return stations;
  }

  async getAll(_: LoginResponse["id"]): Promise<Travel[]> {
    await this.delay();

    if (!this.isSuccessful())
      throw new Error("An error occurred with your request, Try again later");

    return travels.map((travel) => ({
      id: travel.id,
      startPoint: {
        lat: String(fakerFR.location.latitude()),
        lon: String(fakerFR.location.longitude()),
      },
      endPoint: {
        lat: String(fakerFR.location.latitude()),
        lon: String(fakerFR.location.longitude()),
      },
      distance: travel.distance,
      time: travel.time,
      name: travel.name,
    }));
  }

  async getByID(
    travelID: Travel["id"],
    userID: LoginResponse["id"],
  ): Promise<Travel> {
    await this.delay();

    if (!this.isSuccessful())
      throw new Error("An error occurred with your request, Try again later");
    const userTravel = travels.find(
      (travel) => travel.id === travelID && travel.idUser === userID,
    );

    if (!userTravel) throw new Error("Travel does not exist");
    return {
      id: userTravel.id,
      name: userTravel.name,
      time: userTravel.time,
      startPoint: {
        lat: String(fakerFR.location.latitude()),
        lon: String(fakerFR.location.longitude()),
      },
      endPoint: {
        lat: String(fakerFR.location.latitude()),
        lon: String(fakerFR.location.longitude()),
      },
      distance: userTravel.distance,
    };
  }

  public async update(_: TravelRequestUpdate): Promise<void> {
    await this.delay();

    if (!this.isSuccessful()) throw new Error("Cannot be update your travel");
    return;
  }

  public async delete(
    travelID: Travel["id"],
    userID: LoginResponse["id"],
  ): Promise<void> {
    await this.delay();

    if (!this.isSuccessful())
      throw new Error("An error occurs with the deletion");

    console.log("BEFORE", travels);

    travels = travels.filter(
      (travel) => travel.id !== travelID && travel.idUser === userID,
    );

    console.log("AFTER", travels);

    return;
  }

  private isSuccessful(): boolean {
    return Math.random() < this.percentageSuccessRating;
  }
}
