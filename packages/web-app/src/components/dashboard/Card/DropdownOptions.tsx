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

export const DropdownOptions = () => {
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
        <DropdownItem key="copy" startContent={<Pencil />}>
          Edit
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          variant={"flat"}
          startContent={<Trash />}
        >
          Delete route
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
