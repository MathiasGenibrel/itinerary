import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser.tsx";
import { useState } from "react";
import { Travel } from "@shared/contract/travel.ts";
import { toast } from "sonner";
import { useDisclosure } from "@nextui-org/react";
import { TravelRepository } from "../../helpers/repository/travel/TravelRepository.ts";
import { TravelMemoryRepository } from "../../helpers/repository/travel/TravelMemoryRepository.ts";

const travelService: TravelRepository = new TravelMemoryRepository();

export const useLoadingTravels = () => {
  const user = useAuthenticatedUser();
  const [travels, setTravels] = useState<Travel[]>([]);
  const [isLoading, setLoader] = useState<boolean>(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const notifyUser = () => {
    toast.promise(
      async () => {
        setLoader(true);
        return await travelService.getAll(user.id);
      },
      {
        loading: "Travels are loading",
        success: (data) => {
          setTravels(data);
          setLoader(false);
          return "Travels have been recovered";
        },
        error: (error: Error) => {
          setTravels([]);
          onOpen();
          return error.message;
        },
      },
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
