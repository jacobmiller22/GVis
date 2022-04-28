import Layout from "layout";
import Head from "next/head";
import { DFSView } from "views";

const BFSPage = () => {
  return (
    <div id="root">
      <Head>
        <title>GVis - DFS</title>
      </Head>
      <Layout>
        <DFSView />
      </Layout>
    </div>
  );
};

export default BFSPage;
