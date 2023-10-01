import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import {
  InfoCircle,
  Pencil,
  ThreeDotsVertical,
  Trash,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { Travel } from "@shared/contract/travel";
import { FC } from "react";
import { TravelMemoryRepository } from "../../../helpers/repository/travel/TravelMemoryRepository.ts";
import { useAuthenticatedUser } from "../../../hooks/useAuthenticatedUser.tsx";
import { useTravelDispatcher } from "../context/useContextDispatcher.tsx";
import { TravelReducerActionType } from "../context/TravelProvider.tsx";
import { toast } from "sonner";

interface Props {
  travelID: Travel["id"];
}

const travel = new TravelMemoryRepository();

export const DropdownOptions: FC<Props> = ({ travelID }) => {
  const user = useAuthenticatedUser();
  const travelDispatcher = useTravelDispatcher();
  const navigate = useNavigate();

  const deleteHandler = () => {
    toast.promise(travel.delete(travelID, user.id), {
      loading: "Deletion in progress...",
      success: () => {
        travelDispatcher({
          type: TravelReducerActionType.DELETE,
          payload: { travel: travelID },
        });

        return "Your trip has been deleted";
      },
      error: (error: Error) => {
        console.error(error);
        return error.message;
      },
    });
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="text-tiny text-white"
          color="default"
          variant={"light"}
          radius="lg"
          size="sm"
          isIconOnly
          startContent={<ThreeDotsVertical size={16} title={"Options"} />}
        ></Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
        <DropdownItem key="new" startContent={<InfoCircle />}>
          Info
        </DropdownItem>
        <DropdownItem
          key="copy"
          startContent={<Pencil />}
          onClick={() => navigate(`/travel/edit/${travelID}`)}
        >
          Edit
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          variant={"flat"}
          startContent={<Trash />}
          onPress={deleteHandler}
        >
          Delete route
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
