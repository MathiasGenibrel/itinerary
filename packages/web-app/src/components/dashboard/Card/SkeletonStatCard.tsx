import { Skeleton } from "@nextui-org/react";
import { Card } from "@nextui-org/card";

const NUMBER_OF_CARD: number = 2;
const TEMPORARY_ARRAY = Array.from({ length: NUMBER_OF_CARD }, () =>
  Math.random(),
);

const SkeletonStatCard = () => {
  return (
    <Card className="basis-32 grow sm:max-w-fit sm:aspect-square space-y-2">
      <Skeleton className="h-full rounded-lg p-8 sm:p-16">
        <div className="h-full rounded-lg bg-default-300"></div>
      </Skeleton>
    </Card>
  );
};

export const SkeletonStatCardList = () => {
  return TEMPORARY_ARRAY.map((id) => <SkeletonStatCard key={id} />);
};
