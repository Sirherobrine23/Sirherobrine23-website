import Link from "next/link";
import { Find } from "../../lib/FindVersions";

export default function McpeHome({serverUrls}: {serverUrls: {java: {version: string;datePublish: string;isLatest: boolean;javaJar: string;};bedrock: {version: string;datePublish: string;isLatest: boolean;win32: {x64: string;};linux: {x64: string;}}}}) {
  return (
    <>
      <h1>Download Minecraft Servers</h1>
      <div>
        <div>
          <Link href={serverUrls.bedrock.win32.x64}>
            <a>Download Bedrock Server (Windows x64/amd64)</a>
          </Link>
        </div>
        <Link href={serverUrls.bedrock.linux.x64}>
          <a>Download Bedrock Server (Linux x64/amd64)</a>
        </Link>
      </div>
      <div>
        <Link href={serverUrls.java.javaJar}>
          <a>Download Java Server</a>
        </Link>
      </div>
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  return { props: { serverUrls: await Find() } };
}