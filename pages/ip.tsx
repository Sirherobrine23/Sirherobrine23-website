import { NextApiRequest } from "next";

const showHelp = {
  "pt-BR": "O termo IP (Internet Protocol) é um número identificador dado ao seu computador, ou roteador, ao conectar-se à rede. É através desse número que seu computador pode enviar e receber dados na internet. O IP é definido pelo seu provedor de Internet. Ele pode ser estático (não mudar) ou dinâmico (mudando de tempos em tempos).",
  eng: "The term IP (Internet Protocol) is an identifying number given to your computer, or router, when connecting to the network. It is through this number that your computer can send and receive data on the internet. The IP is set by your ISP. It can be static (not changing) or dynamic (changing from time to time)."
}
const youIp = {
  "pt-BR": "Seu IP é:",
  eng: "You IP is:"
}
export default function showIp(props: {ip?: string, lang?: string} = {}) {
  return (
    <>
      <div>
        <h1>{props?.lang ? youIp[props?.lang] ? youIp[props?.lang] : youIp["eng"] : youIp["eng"]} <span style={{color: "green"}}>{props.ip}</span></h1>
        <p>
          <span>{props?.lang ? showHelp[props?.lang] ? showHelp[props?.lang] : showHelp["eng"] : showHelp["eng"]}</span>
        </p>
      </div>
    </>
  );
}
showIp.getInitialProps = async ({ req }: {req: NextApiRequest}) => {
  let ip = req.connection.remoteAddress;
  if (/.*:[0-9]+\./.test(ip)) ip = ip.match(/.*\:(.*)/)[1];
  return {
    ip,
    lang: (req.headers["accept-language"] as string).split(",")[0]
  };
}