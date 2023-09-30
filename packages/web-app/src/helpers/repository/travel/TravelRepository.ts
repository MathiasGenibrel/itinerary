import { Travel, TravelRequestUpdate } from "@shared/contract/travel.ts";
import { LoginResponse } from "@shared/contract/auth.ts";
import { Station } from "../../../components/map/station-types.ts";

export interface TravelRepository {
  getStations: () => Promise<Station[]>;
  getAll: (userID: LoginResponse["id"]) => Promise<Travel[]>;
  getByID: (userID: LoginResponse["id"]) => Promise<Travel>;
  create: (travel: Travel) => Promise<void>;
  update: (travel: TravelRequestUpdate) => Promise<void>;
  delete: (userID: LoginResponse["id"]) => Promise<void>;
}
