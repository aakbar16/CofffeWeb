import Link from "next/link";

const DRINKS = [
  { name: "Latte", type: "latte", desc: "Vanilla • Caramel • Hazelnut • Mocha • Lavender • Matcha • Chai (Masala) • Dulce de Leche" },
  { name: "Cappuccino", type: "cappuccino", desc: "Vanilla • Caramel • Hazelnut • Mocha" },
  { name: "Cold Beverage", type: "iced coffee",   desc: "Vanilla • Caramel • Hazelnut • Mocha • White Chocolate Mocha • Peppermint Mocha • Caramel Brûlé " },
  { name: "Shaken Espresso", type: "shaken espresso", desc: "Brown Sugar Cinnamon • Salted Caramel • Hazelnut Oat " },
  { name: "Macchiato", type: "macchiato", desc: "Vanilla • Caramel • Hazelnut" },
  { name: "Mocha", type: "mocha", desc: "Mocha • White Chocolate Mocha " },
];

export default function PopularDrinks() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.01em" }}>Popular drinks</h2>
            <p style={{ margin: "8px 0 0", color: "var(--muted)" }}>
              Tap a drink to browse recipes.
            </p>
          </div>

          <Link href="/recipes" style={{ color: "var(--muted)" }}>
            View all →
          </Link>
        </div>

        <div
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          {DRINKS.map((d) => (
            <Link
              key={d.type}
              href={`/recipes?type=${d.type}`}
              style={{
                borderRadius: 20,
                border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.05)",
                padding: 16,
                display: "block",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 16 }}>{d.name}</div>
              <div style={{ marginTop: 6, color: "var(--muted)", fontSize: 13 }}>{d.desc}</div>

              <div style={{ marginTop: 12, color: "var(--muted)", fontSize: 13 }}>
                Browse →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}