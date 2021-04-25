import Head from "next/head";
import styles from "../styles/layout.module.css";
import Link from "next/link";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export default ({ children, title }: LayoutProps) => {
  return (
    <div className="application relative">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className="absolute text-white uppercase top-0 h-12 w-full flex z-10 justify-between items-center px-12 py-4">
        <div>
          <span>Alpha 0.0.1</span>
        </div>
        <div className="flex items-center">
          <a
            href="https://trello.com/b/PM3YjevD/jassio"
            target="_blank"
            className="mr-8 hover:text-gray-300"
          >
            Roadmap
          </a>
          <a href="https://github.com/Sirfilior/jassio-client" target="_blank">
            <svg
              className={`inline h-6 ${styles.icon}`}
              viewBox="0 0 1024 1024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                transform="scale(64)"
                fill="#fff"
              />
            </svg>
          </a>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-52">
        <div className="relative">
          <svg
            id="Layer_1"
            data-name="Layer 1"
            className="absolute w-full"
            style={{ bottom: "0" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1365 86.26"
          >
            <path
              d="M1365,0V86.26H0V0C110.94,47.12,374.73,80.26,682.5,80.26S1254.06,47.12,1365,0Z"
              fill="#06132f"
            />
          </svg>
        </div>
        <div className="bg-theme-darker h-40">
          <div className="w-full h-full flex items-center text-white">
            <div className="container mx-auto">
              <Link href="/about">
                <a className="block uppercase mb-3 hover:text-theme-highlight">
                  Über z Projekt
                </a>
              </Link>
              <span>© 2021 Dominik Albrecht</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
