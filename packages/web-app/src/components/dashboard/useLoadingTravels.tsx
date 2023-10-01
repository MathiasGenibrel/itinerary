import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser.tsx';
import { useState } from 'react';
import { toast } from 'sonner';
import { useDisclosure } from '@nextui-org/react';
import { TravelRepository } from '../../helpers/repository/travel/TravelRepository.ts';
// import { TravelMemoryRepository } from "../../helpers/repository/travel/TravelMemoryRepository.ts";
import { TravelRemoteRepository } from '../../helpers/repository/travel/TravelRemoteRepository.ts';
import { useTravelContext } from './context/useTravelContext.tsx';
import { useTravelDispatcher } from './context/useContextDispatcher.tsx';
import { TravelReducerActionType } from './context/TravelProvider.tsx';

const travelService: TravelRepository = new TravelRemoteRepository();

export const useLoadingTravels = () => {
  const user = useAuthenticatedUser();
  const [isLoading, setLoader] = useState<boolean>(true);
  const travels = useTravelContext();
  const travelDispatcher = useTravelDispatcher();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const notifyUser = () => {
    toast.promise(
      async () => {
        setLoader(true);
        return await travelService.getAll(user.id, user.token);
      },
      {
        loading: 'Travels are loading',
        success: (travels) => {
          travelDispatcher({
            type: TravelReducerActionType.INIT,
            payload: { travel: travels },
          });
          setLoader(false);
          return 'Travels have been recovered';
        },
        error: (error: Error) => {
          onOpen();
          return error.message;
        },
      }
    );
  };

  return {
    user,
    travels,
    isLoading,
    isOpen,
    onOpenChange,
    notifyUser,
  };
};
