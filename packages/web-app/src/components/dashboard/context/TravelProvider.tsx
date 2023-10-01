import { createContext, Dispatch, FC, ReactElement, useReducer } from "react";
import { Travel } from "@shared/contract/travel.ts";

export const TravelContext = createContext<Travel[] | null>(null);
export const TravelDispatchContext =
  createContext<Dispatch<TravelReducerAction> | null>(null);

interface Props {
  children: ReactElement[] | ReactElement;
}

export enum TravelReducerActionType {
  INIT = "init",
  ADD = "add",
  DELETE = "delete",
}

interface TravelReducerAction {
  type: TravelReducerActionType;
  payload: TravelReducerPayload;
}

interface TravelReducerPayload {
  travel: Travel[] | Travel | Travel["id"];
}

const travelReducer = (state: Travel[], action: TravelReducerAction) => {
  switch (action.type) {
    case TravelReducerActionType.INIT:
      return action.payload.travel as Travel[];

    case TravelReducerActionType.ADD:
      return [...state, action.payload.travel as Travel];

    case TravelReducerActionType.DELETE:
      const travelID = action.payload.travel as Travel["id"];

      return state.filter((travel) => travel.id !== travelID);

    default:
      throw new Error("Action type is not valid");
  }
};

export const TravelProvider: FC<Props> = ({ children }) => {
  const [value, dispatch] = useReducer(travelReducer, []);

  return (
    <TravelContext.Provider value={value}>
      <TravelDispatchContext.Provider value={dispatch}>
        {children}
      </TravelDispatchContext.Provider>
    </TravelContext.Provider>
  );
};
