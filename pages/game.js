import Link from "next/link";
import Image from "next/image";
import Layout from "../components/layout";
import React from "react";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Layout title="Game">
        <h1>Game</h1>
      </Layout>
    );
  }
}
