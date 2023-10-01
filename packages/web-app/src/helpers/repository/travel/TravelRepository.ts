import { Travel, TravelRequestUpdate } from "@shared/contract/travel.ts";
import { LoginResponse } from "@shared/contract/auth.ts";
import { Station } from "../../../components/map/station-types.ts";

export interface TravelRepository {
  getStations: () => Promise<Station[]>;
  getAll: (userID: LoginResponse["id"]) => Promise<Travel[]>;
  getByID: (
    travelID: Travel["id"],
    userID: LoginResponse["id"],
  ) => Promise<Travel>;
  create: (
    travel: TravelRequestUpdate,
    userID: LoginResponse["id"],
  ) => Promise<void>;
  update: (
    travel: TravelRequestUpdate,
    userID: LoginResponse["id"],
  ) => Promise<void>;
  delete: (
    travelID: Travel["id"],
    userID: LoginResponse["id"],
  ) => Promise<void>;
}
