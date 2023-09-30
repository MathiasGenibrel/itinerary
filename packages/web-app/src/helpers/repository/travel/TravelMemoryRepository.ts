import { TravelRepository } from "./TravelRepository.ts";
import { FakeTimeout } from "../../FakeTimeout.ts";
import { Travel, TravelRequestUpdate } from "@shared/contract/travel.ts";
import { LoginResponse } from "@shared/contract/auth.ts";
import { faker } from "@faker-js/faker";
import { Station } from "../../../components/map/station-types.ts";
import { stations } from "../../../mocks/stations.ts";

const createTravel = (): Travel => ({
  id: faker.number.int(),
  name: faker.location.streetAddress(),
  distance: String(faker.number.int({ min: 1e3, max: 35e3 })),
  time: faker.number.int({ min: 5, max: 60 * 4 }),
  endPoint: {
    lat: String(faker.location.latitude()),
    lon: String(faker.location.longitude()),
  },
  startPoint: {
    lat: String(faker.location.latitude()),
    lon: String(faker.location.longitude()),
  },
});

export class TravelMemoryRepository
  extends FakeTimeout
  implements TravelRepository
{
  private readonly percentageSuccessRating: number = 0.6;

  public async create(_: Travel): Promise<void> {
    await this.delay();

    if (!this.isSuccessful())
      throw new Error("An error occurred with your request, Try again later");
    return;
  }

  public async getStations(): Promise<Station[]> {
    await this.delay();

    if (!this.isSuccessful())
      throw new Error("An error occurred with your request, Try again later");
    return stations;
  }

  async getAll(_: LoginResponse["id"]): Promise<Travel[]> {
    const numberOfTravels: number = 6;
    await this.delay();

    if (!this.isSuccessful())
      throw new Error("An error occurred with your request, Try again later");

    let travels: Travel[] = [];

    for (let i = 0; i < numberOfTravels; i++) {
      travels.push(createTravel());
    }

    return travels;
  }

  async getByID(_: LoginResponse["id"]): Promise<Travel> {
    await this.delay();

    if (!this.isSuccessful())
      throw new Error("An error occurred with your request, Try again later");
    return createTravel();
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
