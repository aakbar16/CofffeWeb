import Link from "next/link";
import "../styles/learnRatiosSection.css";

export default function LearnRatiosSection() {
  return (
    <section className="section learnRatiosSection">
      <div className="container learnRatiosContainer">
        <div className="learnRatiosContent">
          <h2 className="learnRatiosTitle">
            Learn the ratios, brew with confidence.
          </h2>

          <p className="learnRatiosText">
            Understand espresso, milk, and foam balance for every drink so you
            can adjust strength, texture, and flavour like a barista.
          </p>

          <div className="learnRatiosButtonWrap">
            <Link href="/learn-ratios" className="learnRatiosButton">
              Learn more <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="learnRatiosMedia">
          <img src="/coffee-options.jpg" alt="Coffee options" />
        </div>
      </div>
    </section>
  );
}