import { TravelRepository } from "./TravelRepository.ts";
import { FakeTimeout } from "../../FakeTimeout.ts";
import {
  Travel,
  TravelEntity,
  TravelRequestUpdate,
} from "@shared/contract/travel.ts";
import { LoginResponse } from "@shared/contract/auth.ts";
import { fakerFR } from "@faker-js/faker";
import { Station } from "../../../components/map/station-types.ts";
import { stations } from "../../../mocks/stations.ts";

const travels: TravelEntity[] = [];

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

    console.log("[TRAVEL REQUEST] : ", {
      travel,
      idUser: userID,
    });

    travels.push({
      ...travel,
      id: travels.length + 1,
      idUser: userID,
    });

    console.log(travels);

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

    console.log(travels);

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

  public async delete(_: LoginResponse["id"]): Promise<void> {
    await this.delay();

    if (!this.isSuccessful())
      throw new Error("An error occurs with the deletion");
    return;
  }

  private isSuccessful(): boolean {
    return Math.random() < this.percentageSuccessRating;
  }
}
