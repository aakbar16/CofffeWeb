import Link from "next/link";
import "../styles/endlessRecipesSection.css";

export default function EndlessRecipesSection() {
  return (
    <section className="section endlessRecipesSection">
      <div className="container endlessRecipesContainer">
        <div className="endlessRecipesContent">
          <h2 className="endlessRecipesTitle">
            Endless recipes, one click away.
          </h2>

          <p className="endlessRecipesText">
            Explore a vast collection of coffee recipes from around the world.
            Whether you&apos;re craving a classic espresso or an adventurous new brew,
            we&apos;ve got you covered.
          </p>

          <div className="endlessRecipesButtonWrap">
            <Link href="/recipes" className="endlessRecipesButton">
              Browse recipes <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="endlessRecipesMedia">
          <img src="/endless-recipes.jpg" alt="Coffee recipes" />
        </div>
      </div>
    </section>
  );
}