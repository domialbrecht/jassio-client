import styles from "../styles/rules.module.css";

function Cards() {
  let cards = ["6", "7", "8", "9", "10", "jack", "queen", "king", "1"];
  return cards.map((card) => (
    <div className="bg-theme-sky" key={card}>
      <svg className="w-full h-full" viewBox="0 0 169 245">
        <use href={"/images/svg-cards.svg#spade_" + card} />
      </svg>
    </div>
  ));
}

const Rules = () => {
  return (
    <div className="relative mt-48">
      <div className="container mx-auto mb-40 text-center">
        <h2 className="text-6xl uppercase text-theme mb-5">
          Weisch nid wie? Hie d Regle
        </h2>
        <p className="text-lg">
          Nachfougend isch der Spiuablouf erklärt. Klick jewils uf d ?-Element
          für e lengeri Texterklärig. Die Regle si natürlech ou für z normale
          Jasse vor Ort awendbar.
        </p>
      </div>
      <div className={`${styles.rulesSection} py-20 px-10`}>
        <div className={styles.help}>?</div>
        <div className="mb-64 flex justify-around  items-center">
          <div className="table w-1/3">
            <div className="flex justify-between mb-5 px-5">
              <div className="bg-theme-contrast w-12 h-12 rounded-full"></div>
              <div className="bg-theme-dark w-12 h-12 rounded-full"></div>
            </div>
            <div className="bg-theme-skylight w-full h-96 rounded-2xl"></div>
            <div className="flex justify-between mt-5 px-5">
              <div className="bg-theme-dark w-12 h-12 rounded-full"></div>
              <div className="bg-theme-contrast w-12 h-12 rounded-full"></div>
            </div>
          </div>
          <div className="w-1/3">
            <h3 className="uppercase text-5xl mb-3 text-theme font-bold">
              Z Setup
            </h3>
            <p className="text-xl">
              Zum spile vomene Schieber, so heisst die Jassart wo mir hie spile,
              bruchsch aus ersts mau vier Lüt. Gjasset seuber wird ner i zwöier
              Teams. D Teammitglider sitze übers Chrütz.
            </p>
          </div>
        </div>
        <div className="mb-12 flex justify-around  items-center">
          <div className="w-1/3">
            <div className="col-span-2 grid grid-cols-4 gap-3 mb-10">
              <div className="bg-theme-sky">
                <svg className="w-full h-full" viewBox="0 0 169 245">
                  <use href="/images/svg-cards.svg#heart_1" />
                </svg>
              </div>
              <div className="bg-theme-sky">
                <svg className="w-full h-full" viewBox="0 0 169 245">
                  <use href="/images/svg-cards.svg#diamond_1" />
                </svg>
              </div>
              <div className="bg-theme-sky">
                <svg className="w-full h-full" viewBox="0 0 169 245">
                  <use href="/images/svg-cards.svg#spade_1" />
                </svg>
              </div>
              <div className="bg-theme-sky">
                <svg className="w-full h-full" viewBox="0 0 169 245">
                  <use href="/images/svg-cards.svg#club_1" />
                </svg>
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-9 gap-1">{Cards()}</div>
          </div>
          <div className="w-1/3">
            <h3 className="uppercase text-5xl mb-3 text-theme font-bold">
              D Jasscharte
            </h3>
            <p className="text-xl">
              Es Jassdeck besteit us 36 Charte, ufteilt i vier verschideni
              Farbe. D Farbe vo links nach rechts heisse:{" "}
              <span className="font-bold">Härz, Egge, Schufle, Chrütz</span>. I
              jeder Farb si daher 9 Charte. Agfange bim 6i, 7ni, 8i, 9i
              <span className="text-theme-accent">(Näu)</span>, zum 10ni ner der{" "}
              <span className="font-bold">
                Buur, d Dame, der Chünig und z Ass
              </span>
              .
            </p>
          </div>
        </div>
      </div>
      <div className={`${styles.rulesSection} ${styles.rulesSectionDark}`}>
        <div className={styles.help}>?</div>
      </div>
      <div className={styles.rulesSection}>
        <div className={styles.help}>?</div>
      </div>
    </div>
  );
};
export default Rules;
