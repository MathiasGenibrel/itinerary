import { Travel, TravelRequestUpdate } from "@shared/contract/travel.ts";
import { LoginResponse } from "@shared/contract/auth.ts";
import { Station } from "../../../components/map/station-types.ts";

export interface TravelRepository {
  getStations: () => Promise<Station[]>;
  getAll: (
    userID: LoginResponse["id"],
    token : LoginResponse["token"]
  ) => Promise<Travel[]>;
  getByID: (
    travelID: Travel["id"],
    userToken: LoginResponse["token"],
  ) => Promise<Travel>;
  create: (
    travel: TravelRequestUpdate,
    userID: LoginResponse["id"],
    userToken: LoginResponse["token"],
  ) => Promise<void>;
  update: (
    travel: TravelRequestUpdate,
    userToken: LoginResponse["token"],
  ) => Promise<void>;
  delete: (
    travelID: Travel["id"],
    userToken: LoginResponse["token"],
  ) => Promise<void>;
}
