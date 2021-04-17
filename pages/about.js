import Link from "next/link";
import Image from "next/image";
import Layout from "../components/layout";

export default function About() {
  return (
    <Layout title="About">
      <h1>About</h1>
      <Image
        src="/images/card.jpg" // Route of the image file
        height={144} // Desired size with correct aspect ratio
        width={144} // Desired size with correct aspect ratio
        alt="Your Name"
      />
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  );
}
