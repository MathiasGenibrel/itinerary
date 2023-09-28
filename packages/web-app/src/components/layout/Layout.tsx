import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <section className={"flex flex-col min-h-[100dvh] justify-between"}>
        <Header />
        <main className={"mx-8"}>
          <Outlet />
        </main>
        <Footer />
      </section>
    </>
  );
}
