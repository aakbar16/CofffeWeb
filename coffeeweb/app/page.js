import Hero from "@/components/Hero";
import PopularDrinks from "@/components/PopularDrinks";
import EndlessRecipesSection from "@/components/EndlessRecipesSection";
import LearnRatiosSection from "@/components/LearnRatiosSection";     

export default function HomePage() {
  return (
    <main>
      <Hero /> 
      <PopularDrinks />
      <EndlessRecipesSection />
      <LearnRatiosSection />
    </main>
  );
}