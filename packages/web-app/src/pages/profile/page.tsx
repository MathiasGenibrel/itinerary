import { Card, CardBody } from "@nextui-org/card";
import { Toaster } from "sonner";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser.tsx";
import { Chip } from "@nextui-org/react";
import { ProfileForm } from "../../components/profile/ProfileForm.tsx";

export default function Page() {
  const user = useAuthenticatedUser();

  return (
    <section>
      <Toaster />
      <section className="flex gap-2 w-full">
        <img
          alt=""
          className="w-20 h-20 aspect-square rounded-2xl shadow"
          src="/avatar.webp"
        />
        <section className="w-full overflow-hidden">
          <h1 className="text-2xl font-semibold">{user.username}</h1>
          <section className="flex items-center gap-4 w-full">
            <p className="font-medium opacity-80 truncate">{user.email}</p>
            <Chip size="sm" radius="sm" variant="flat">
              JOINED JUN 7, 2022
            </Chip>
          </section>
          <p
            className="opacity-60 truncate"
            title="Bring home the bacon !, Bring home the bacon ! Bring home the bacon!"
          >
            Adventure awaits, build your world, and always stay vigilant, but
            always remember: Never dig down!
          </p>
        </section>
      </section>
      <Card>
        <CardBody className={"gap-2"}>
          <h1 className={"text-3xl font-medium text-center"}>
            Update Credentials
          </h1>
          <ProfileForm />
        </CardBody>
      </Card>
    </section>
  );
}
