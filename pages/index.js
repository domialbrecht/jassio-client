import Layout from "../components/layout";
import Button from "../components/button";
import Link from "next/link";
import styles from "../styles/home.module.css";
import React from "react";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardRotate: 10,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll(event) {
    let rTamount = 10;
    let scrollPixelDuration = 250;
    let dR = rTamount / scrollPixelDuration;
    if (window.scrollY < scrollPixelDuration) {
      this.setState({ cardRotate: 10 - dR * window.scrollY });
    }
  }
  render() {
    let rotateStyles = {
      transform: `translate(0%, ${28 - this.state.cardRotate}%) rotate(${
        this.state.cardRotate
      }deg)`,
    };
    return (
      <Layout title="Home">
        <div className={`relative ${styles.heroContainer}`}>
          <div
            className={`pt-12 pb-40 absolute top-0 right-0 left-0 bottom-0 ${styles.hero}`}
          >
            <div className="flex flex-col container mx-auto h-full">
              <div className="flex justify-between items-center h-full">
                <div className="">
                  <div>
                    <h1 className="mb-8 text-8xl text-white font-sans font-bold uppercase">
                      Intersim Jass<br></br>Online.
                    </h1>
                    <div>
                      <Link href="/game">
                        <a
                          className={`px-8 py-3 text-2xl text-white relative tracking-widest bg-theme-highlight uppercase ${styles.heroButton}`}
                        >
                          <span className={styles.heroButtonOverlay}></span>
                          <span className="label relative z-10">
                            Spiu starte
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="relative z-10">
                  <div
                    className={`card-placeholder border-theme-highlight p-5 border-4 z-10 bg-white  ${styles.card}`}
                    style={rotateStyles}
                  >
                    <svg
                      id="Layer_1"
                      className="h-full w-full"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 386.31 765.42"
                    >
                      <path
                        d="M224.82,569.76,61,423c-94.89-94.89,69-258.74,163.86-163.86C320.43,163.57,484.29,327.43,388.67,423Z"
                        transform="translate(-31.57 -17.33)"
                        fill="#db194c"
                      />
                      <path
                        d="M71.19,86.86,37.74,56.91C18.37,37.54,51.82,4.09,71.19,23.46,90.7,4,124.15,37.39,104.63,56.91Z"
                        transform="translate(-31.57 -17.33)"
                        fill="#db194c"
                      />
                      <path
                        d="M378.52,86.64l-33.45-30c-19.36-19.36,14.08-52.81,33.45-33.44C398,3.72,431.49,37.17,412,56.68Z"
                        transform="translate(-31.57 -17.33)"
                        fill="#db194c"
                      />
                      <path
                        d="M70.85,713.21l-33.44,30C18,762.53,51.49,796,70.85,776.61c19.52,19.52,53-13.93,33.45-33.44Z"
                        transform="translate(-31.57 -17.33)"
                        fill="#db194c"
                      />
                      <path
                        d="M378.19,713.44l-33.45,29.95c-19.37,19.37,14.08,52.82,33.45,33.45,19.52,19.52,53-13.93,33.45-33.45Z"
                        transform="translate(-31.57 -17.33)"
                        fill="#db194c"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="uppercase text-white text-2xl">
                <span className={styles.desc}>22 Spiu gspiut</span>
                <span className={styles.desc}>64 Bure Gwise</span>
                <span className={styles.desc}>Mark 10 Streak</span>
              </div>
            </div>
          </div>
          <div>
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
                fill="#fff"
              />
            </svg>
          </div>
        </div>
        <div className="relative mt-48">
          <div className="container mx-auto mb-40 text-center">
            <h2 className="text-6xl uppercase text-theme">
              Weisch nid wie? Hie d Regle
            </h2>
          </div>
          <div className={styles.rulesSection}></div>
          <div
            className={`${styles.rulesSection} ${styles.rulesSectionDark}`}
          ></div>
          <div className={styles.rulesSection}></div>
        </div>
      </Layout>
    );
  }
}
