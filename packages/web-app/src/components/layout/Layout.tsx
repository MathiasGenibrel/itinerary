import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <section className={"flex flex-col min-h-[100dvh] justify-between"}>
        <section className="flex flex-col gap-2">
          <Header />
          <main className={"px-8 w-full max-w-screen-2xl mx-auto"}>
            <Outlet />
          </main>
        </section>
        <Footer />
      </section>
    </>
  );
}
