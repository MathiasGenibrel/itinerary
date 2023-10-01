import { FC } from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ApplicationPath } from "../../pages/router.tsx";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  notifyUser: () => void;
}

export const ErrorLoadingModal: FC<Props> = ({
  isOpen,
  onOpenChange,
  notifyUser,
}) => {
  const navigate = useNavigate();

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => {
        notifyUser();
      }}
      placement="center"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              An error attempts with your Travels
            </ModalHeader>
            <ModalBody>
              <p>
                We apologize for the inconvenience. We may be experiencing
                problems with our servers.
              </p>
              <p className={"font-medium"}>
                Please try to reload, or come back later.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                className="w-fit px-8"
                color="danger"
                variant="flat"
                onPress={() => navigate(ApplicationPath.HOME)}
              >
                Back to home
              </Button>
              <Button className={"w-full"} color="primary" onPress={onClose}>
                Reload your travel search
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
