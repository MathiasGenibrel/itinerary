import { PointGPS } from "./pdf";
import { LoginResponse } from "@shared/contract/auth";

export interface Travel {
  id: number;
  name: string;
  startPoint: PointGPS;
  endPoint: PointGPS;
  distance: string;
  time: number;
}

export interface TravelEntity extends TravelRequestUpdate {
  id: Travel["id"];
  idUser: LoginResponse["id"];
}

export interface TravelRequestUpdate
  extends Omit<Travel, "id" | "startPoint" | "endPoint"> {
  /**
   * ID of starting station (station code)
   */
  startPoint: string;

  /**
   * ID of arrival station (station code)
   */
  endPoint: string;
}

export interface TravelRequestCreate {
  travel: TravelRequestUpdate;
  idUser: number;
}
