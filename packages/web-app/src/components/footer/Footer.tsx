import { Link } from "@nextui-org/link";
import { Github, Linkedin, Youtube } from "react-bootstrap-icons";

export function Footer() {
  return (
    <>
      <footer
        className={
          "flex w-full justify-center sm:justify-start gap-2 px-8 pb-8 pt-12 max-w-screen-2xl mx-auto"
        }
      >
        <span>©Itinerary</span>
        <nav aria-label="Footer navigation" className={"flex flex-col gap-4"}>
          <ul aria-label="Privacy links" className="flex gap-2">
            <li>
              <Link color={"foreground"} href="#">
                Terms
              </Link>
            </li>
            <li>
              <Link color={"foreground"} href="#">
                Security
              </Link>
            </li>
            <li>
              <Link color={"foreground"} href="#">
                Privacy
              </Link>
            </li>
          </ul>

          <ul aria-label="Social network links" className="flex gap-4">
            <li>
              <Link
                color={"foreground"}
                className={"opacity-80"}
                href="https://github.com/MathiasGenibrel/itinerary"
                target={"_blank"}
              >
                <Github size={24} />
              </Link>
            </li>
            <li>
              <Link color={"foreground"} className={"opacity-80"} href="#">
                <Linkedin size={24} />
              </Link>
            </li>
            <li>
              <Link color={"foreground"} className={"opacity-80"} href="#">
                <Youtube size={24} />
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}
