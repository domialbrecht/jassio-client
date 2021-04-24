import Layout from "../components/layout";
import Link from "next/link";
import styles from "../styles/home.module.css";
import React from "react";
import Rules from "../components/rules";

function CardItem(props) {
  const card = props.card;
  return (
    <div className={`z-10  ${styles.card}`} style={card.styles}>
      <div className="playing-card-container">
        <div className="playing-card">
          <svg className="w-full h-full" viewBox="0 0 169 245">
            <use href={"/images/svg-cards.svg#" + card.name} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function CardList(props) {
  const cards = props.cards;
  const cardList = cards.map((card) => (
    // Wrong! The key should have been specified here:
    <CardItem key={card.name} card={card} />
  ));
  return (
    <div className={`relative z-10 h-full  ${styles.cardWrapper}`}>
      {cardList}
    </div>
  );
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardRotate: 10,
    };
    this.cards = [
      {
        name: "club_10",
        styles: this.getRotateStyle(0),
      },
      {
        name: "diamond_queen",
        styles: this.getRotateStyle(1),
      },
      {
        name: "heart_king",
        styles: this.getRotateStyle(2),
      },
    ];
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
    let scrollPixelDuration = 200;
    let dR = rTamount / scrollPixelDuration;
    if (window.scrollY < scrollPixelDuration) {
      this.setState({ cardRotate: 10 - dR * window.scrollY });
    } else {
      this.setState({ cardRotate: 10 - dR * 200 });
    }
  }
  getRotateStyle(i) {
    return {
      transform: `translate(0%, ${28 - this.state.cardRotate * i}%) rotate(-${
        this.state.cardRotate * i
      }deg)`,
    };
  }
  render() {
    let cards = this.cards.map((card, i) => {
      card.styles = this.getRotateStyle(i);
      return card;
    });
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
                <CardList cards={cards} />
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
        <Rules />
      </Layout>
    );
  }
}
