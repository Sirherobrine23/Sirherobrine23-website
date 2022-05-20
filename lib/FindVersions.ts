import axios from "axios";

export async function Find() {
  const java = (await axios.get("https://mcpeversions.sirherobrine23.org/java/latest")).data as {version: string, datePublish: string, isLatest: boolean, javaJar: string};
  const bedrock = (await axios.get("https://mcpeversions.sirherobrine23.org/bedrock/latest")).data as {version: string, datePublish: string, isLatest: boolean, win32: {x64: string}, linux: {x64: string}};
  return {
    java: java,
    bedrock: bedrock
  }
}