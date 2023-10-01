import { PointGPS } from "./pdf";

export interface Travel {
  id: number;
  name: string;
  startPoint: PointGPS;
  endPoint: PointGPS;
  distance: string;
  time: number;
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

export type TravelRequestCreate = TravelRequestUpdate;