import RecipeFilters from "@/components/RecipeFilters";

export default function RecipesPage() {
  return (
    <main className="container">

      <h1 style={{ fontSize: "36px", marginTop: "40px" }}>
        Coffee Recipes
      </h1>

      <p style={{ opacity: 0.7 }}>
        Browse and filter 150+ coffee drinks.
      </p>

      <RecipeFilters />

    </main>
  );
}