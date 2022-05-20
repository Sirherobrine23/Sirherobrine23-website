import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Next.js + TypeScript</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}