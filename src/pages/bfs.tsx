import Layout from "layout";
import Head from "next/head";
import { BFSView } from "views";

const DFSPage = () => {
  return (
    <div id="root">
      <Head>
        <title>GVis - DFS</title>
      </Head>
      <Layout>
        <BFSView />
      </Layout>
    </div>
  );
};

export default DFSPage;
