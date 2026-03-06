import Hero from "@/components/Hero";
import CoffeeBeansSection from "@/components/CoffeeBeansSection";
import EndlessRecipesSection from "@/components/EndlessRecipesSection";
import LearnRatiosSection from "@/components/LearnRatiosSection";     

export default function HomePage() {
  return (
    <main>
      <Hero /> 
      <CoffeeBeansSection />
      <EndlessRecipesSection />
      <LearnRatiosSection />
    </main>
  );
}