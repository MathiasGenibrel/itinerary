import { FC, ReactElement } from "react";

interface Props {
  title: string;
  children: ReactElement;
}

export const SectionWrapper: FC<Props> = ({ title, children }) => {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="uppercase text-sm font-semibold">{title}</h2>
      {children}
    </section>
  );
};
