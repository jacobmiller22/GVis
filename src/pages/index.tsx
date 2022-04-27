import type { NextPage } from "next";
import Head from "next/head";
import { IndexView } from "views";
import Layout from "layout";

const IndexPage: NextPage = () => {
  return (
    <div id="root">
      <Head>
        <title>Index Page</title>
      </Head>
      <Layout>
        <IndexView />
      </Layout>
    </div>
  );
};

export default IndexPage;
