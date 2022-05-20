import Head from "next/head";
import NavBar, {navbarItems} from "../components/navbar";
import "../styles/global.css";

const navbarItems: navbarItems = [
  {title: "Home", url: "/"},
  {title: "Get You IP", url: "/ip"},
  {title: "Minecraft", url: "/Minecraft"},
];
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Matheus Sampaio Queiroga (@Sirherobrine23)</title>
      </Head>
      <header>
        <NavBar items={navbarItems} />a
      </header>
      <body>
        <div className="container">
          <Component {...pageProps} />
        </div>
      </body>
    </>
  );
}