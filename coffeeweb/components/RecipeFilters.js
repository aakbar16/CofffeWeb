export default function RecipeFilters() {
    const filters = [
        "Espresso",
        "Pour Over",
        "French Press",
        "Cold Brew",
        "Aeropress",
        "Moka Pot",
        "Siphon",
    ];
    
    return (
        <div style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "20px"
        }}>
            {filters.map(filter => (
                <button
                    key={filter}
                    style={{
                        padding: "8px 16px",
                        borderRadius: "20px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        background: "transparent",
                        color: "white",
                        cursor: "pointer",
                    }}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
}