import type { NextPage } from "next";
import Head from "next/head";
import { IndexView } from "views";

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Index Page</title>
      </Head>

      <IndexView />
    </>
  );
};

export default IndexPage;
