import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 40px",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 16 }}>
        <Link href="/">Coffee Wiki</Link>
      </div>

      <div style={{ display: "flex", gap: 22, fontSize: 14, alignItems: "center" }}>
        <Link className="navLink" href="/learn">Learn</Link>

        {/* Hover Dropdown for Recipes */}
        <div className="navWrap">
          <Link className="navLink" href="/recipes">Recipes</Link>

          <div className="mega">
            <div className="megaGrid">
              {/* Big column like Apple */}
              <div className="megaBig">
                <div className="megaTitle">Explore Recipes</div>
                <Link href="/recipes">All Recipes</Link>
                <Link href="/recipes?type=espresso">Espresso Drinks</Link>
                <Link href="/recipes?type=iced">Cold & Iced</Link>
              </div>

              {/* Filter list */}
              <div className="megaList">
                <div className="megaTitle">Coffee Drinks</div>
                <Link href="/recipes?type=espresso">Espresso</Link>
                <Link href="/recipes?type=latte">Latte</Link>
                <Link href="/recipes?type=cappuccino">Cappuccino</Link>
                <Link href="/recipes?type=macchiato">Macchiato</Link>
                <Link href="/recipes?type=mocha">Mocha</Link>
              </div>

              {/* Another list */}
              <div className="megaList">
                <div className="megaTitle">More</div>
                <Link href="/recipes?type=coldbrew">Cold Brew</Link>
                <Link href="/recipes?type=frappe">Frappe</Link>
                <Link href="/recipes?type=shaken">Shaken</Link>
                <Link href="/recipes?type=seasonal">Seasonal</Link>
              </div>
            </div>
          </div>
        </div>

        <Link className="navLink" href="/methods">Methods</Link>
        <Link className="navLink" href="/saved">Saved</Link>
        <Link className="navLink" href="/dashboard">Dashboard</Link>
        <Link className="navLink" href="/login">Login</Link>
        <Link className="navLink" href="/register">Register</Link>
      </div>
    </nav>
  );
}