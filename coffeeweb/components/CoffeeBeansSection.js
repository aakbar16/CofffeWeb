import Link from "next/link";
import "../styles/coffeeBeans.css";

export default function CoffeeBeansSection() {
  return (
    <section className="section coffeeBeansSection">
      <div className="container coffeeBeansContainer">
        <div style={{ paddingRight: 16 }}>
          <h2 className="coffeeTitle">Understand coffee beans.</h2>

          <p className="coffeeText">
            Learn about different coffee bean varieties, their flavor profiles,
            and how to choose the right beans for your brew.
          </p>

          <div style={{ marginTop: 22 }}>
            <Link href="/learn" className="learnButton">
              Learn more <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="coffeeVideoCard">
          <video
            src="/learn-ratios.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="coffeeVideo"
          />
        </div>
      </div>
    </section>
  );
}