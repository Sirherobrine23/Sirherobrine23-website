import Link from "next/link";
import cssNavBar from "../styles/navBar.module.css";

export type navbarItems = Array<{
  title: string,
  url: string
}>;

export default function Navbar(Props: {items: navbarItems}) {
  const {items} = Props;
  return (
    <nav className={cssNavBar["navbar"]}>
      <ul>
        {items.map(item => (
          <li key={item.url}>
            <Link href={item.url}>
              <a>{item.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}