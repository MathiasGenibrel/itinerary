import { Travel, TravelRequestUpdate } from "@shared/contract/travel.ts";
import { LoginResponse } from "@shared/contract/auth.ts";

export interface TravelRepository {
  getAll: (userID: LoginResponse["id"]) => Promise<Travel[]>;
  getByID: (userID: LoginResponse["id"]) => Promise<Travel>;
  create: (travel: Travel) => Promise<void>;
  update: (travel: TravelRequestUpdate) => Promise<void>;
  delete: (userID: LoginResponse["id"]) => Promise<void>;
}
