import { TravelRepository } from "./TravelRepository.ts";
import { Travel, TravelRequestUpdate } from "@shared/contract/travel.ts";
import { LoginResponse } from "@shared/contract/auth.ts";
import { Station } from "../../../components/map/station-types.ts";

export class TravelRemoteRepository implements TravelRepository{

  public async create(
    travel: TravelRequestUpdate,
    userID: LoginResponse["id"],
    userToken : LoginResponse["token"]
  ): Promise<void> {
    await fetch('http://localhost:4001/api/travel/save',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': userToken
        },
        body: JSON.stringify({
            "travel": travel,
            "idUser": userID
        })
    })
    return;
  }

  public async getStations(): Promise<Station[]> {
    const response = await fetch('http://localhost:4001/api/bike-data',
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const stations = response.json();
    return stations;
  }

  async getAll(userID: LoginResponse["id"], token: LoginResponse["token"]): Promise<Travel[]> {
    const response = await fetch(`http://localhost:4001/api/travel/all/${userID}`,
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    const travels = await response.json();
    return travels;
  }

  async getByID(
    travelID: Travel["id"],
    userToken: LoginResponse["token"],
  ): Promise<Travel> {
    const response = await fetch(`http://localhost:4001/api/travel/${travelID}`,
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': userToken
        }
    })
    const travel = await response.json();
    return travel;
  }

  public async update(travel: TravelRequestUpdate, userToken: LoginResponse["token"]): Promise<void> {
    await fetch(`http://localhost:4001/api/update`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': userToken
        },
        body: JSON.stringify(travel)
    })
    return;
  }

  public async delete(
    travelID: Travel["id"],
    userToken: LoginResponse["token"],
  ): Promise<void> {
    await fetch(`http://localhost:4001/api/delete/${travelID}`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': userToken
        }
    })
    return;
  }
}
