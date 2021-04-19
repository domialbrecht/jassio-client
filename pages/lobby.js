import Layout from "../components/layout";
import Lobby from "../components/lobby";
export default function Home() {
  return (
    <Layout title="Home">
      <div>
        <Lobby />
        <p className="text-gray-200">Test2</p>
      </div>
    </Layout>
  );
}
