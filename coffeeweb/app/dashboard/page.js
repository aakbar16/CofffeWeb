"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import "../../styles/dashboard.css";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    async function loadDashboard() {
      const { data } = await supabase.auth.getUser();

      if (!data?.user) {
        router.push("/login");
        return;
      }

      setUser(data.user);

      const { data: recipes, error } = await supabase
        .from("saved_recipes")
        .select("*")
        .eq("user_id", data.user.id)
        .order("created_at", { ascending: false });

      if (!error) {
        setSavedRecipes(recipes || []);
      }
    }

    loadDashboard();
  }, [router]);

  const firstName = useMemo(() => {
    if (!user?.email) return "there";
    return user.email.split("@")[0];
  }, [user]);

  const totalSaved = savedRecipes.length;
  const latestRecipe = savedRecipes[0]?.recipe_name || "Nothing yet";
  const collectionPercent = Math.min(totalSaved * 12 + 20, 88);

  if (!user) return null;

  return (
    <main className="dashboardShellPage">
      <section className="dashboardShellFrame">
        <div className="dashboardShellBackground">
          <aside className="dashboardSidebarPanel">
            <div className="dashboardBrandBlock">
              <p className="dashboardBrandTitle">Coffidilia</p>
            </div>

            <nav className="dashboardSidebarNav">
              <button className="dashboardSidebarItem dashboardSidebarItemActive">
                Home
              </button>

              <button
                className="dashboardSidebarItem"
                onClick={() => router.push("/recipes")}
              >
                Recipes
              </button>

              <button className="dashboardSidebarItem">Saved</button>
              <button className="dashboardSidebarItem">History</button>
              <button className="dashboardSidebarItem">Profile</button>
            </nav>
          </aside>

          <section className="dashboardWorkspacePanel">
            <div className="dashboardTopHeader">
              <h1 className="dashboardHeaderTitle">Coffee Dashboard</h1>

              <div className="dashboardHeaderRight">
                <div className="dashboardSearchBar">Search saved recipes</div>
                <div className="dashboardUserChip">{user.email}</div>
              </div>
            </div>

            <div className="dashboardTopStats">
              <div className="dashboardStatCard dashboardStatCardBlue">
                <p className="dashboardStatLabel">Saved recipes</p>
                <h2 className="dashboardStatValue">{totalSaved}</h2>
                <p className="dashboardStatSubtext">Coffee resources</p>
              </div>

              <div className="dashboardStatCard dashboardStatCardOrange">
                <p className="dashboardStatLabel">Latest save</p>
                <h2 className="dashboardStatValue dashboardCap">
                  {latestRecipe}
                </h2>
                <p className="dashboardStatSubtext">Most recent drink</p>
              </div>

              <div className="dashboardStatCard dashboardStatCardPeach">
                <p className="dashboardStatLabel">Collection</p>
                <h2 className="dashboardStatValue">
                  {totalSaved > 0 ? "Growing" : "Empty"}
                </h2>
                <p className="dashboardStatSubtext">Your library status</p>
              </div>
            </div>

            <div className="dashboardContentGrid">
              <div className="dashboardMainAnalyticsCard">
                <div className="dashboardAnalyticsHeader">
                  <div>
                    <p className="dashboardSmallEyebrow">Your coffee space</p>
                    <h2 className="dashboardAnalyticsTitle">
                      Welcome back, {firstName}
                    </h2>
                    <p className="dashboardAnalyticsText">
                      Manage your saved drinks, track your collection, and keep
                      your coffee journey organized in one place.
                    </p>
                  </div>

                  <button
                    className="dashboardPrimaryAction"
                    onClick={() => router.push("/recipes")}
                  >
                    Browse Recipes
                  </button>
                </div>

                <div className="dashboardAnalyticsBody">
                  <div className="dashboardAnalyticsLeft">
                    <p className="dashboardPanelLabel">Coffee collection</p>
                    <h3 className="dashboardAnalyticsNumber">{totalSaved}</h3>
                    <p className="dashboardAnalyticsSubtext">
                      saved recipes in your library
                    </p>

                    <button
                      className="dashboardSecondaryAction"
                      onClick={() => router.push("/recipes")}
                    >
                      Add More
                    </button>
                  </div>

                  <div className="dashboardChartArea">
                    <div className="dashboardChartLegend">
                      <span>Saved</span>
                      <span>Activity</span>
                    </div>

                    <div className="dashboardBars">
                      <div className="dashboardBarWrap"><div className="dashboardBar h42" /></div>
                      <div className="dashboardBarWrap"><div className="dashboardBar h64" /></div>
                      <div className="dashboardBarWrap"><div className="dashboardBar h38" /></div>
                      <div className="dashboardBarWrap"><div className="dashboardBar h78" /></div>
                      <div className="dashboardBarWrap"><div className="dashboardBar h51" /></div>
                      <div className="dashboardBarWrap"><div className="dashboardBar h69" /></div>
                      <div className="dashboardBarWrap"><div className="dashboardBar h47" /></div>
                      <div className="dashboardBarWrap"><div className="dashboardBar h73" /></div>
                    </div>
                  </div>
                </div>

                <div className="dashboardRecipeSummaryRow">
                  {savedRecipes.length === 0 ? (
                    <div className="dashboardEmptyCollectionCard">
                      <p className="dashboardPanelLabel">Saved recipes</p>
                      <h3 className="dashboardEmptyCollectionTitle">
                        No saved recipes yet
                      </h3>
                      <p className="dashboardEmptyCollectionText">
                        Start saving drinks and they will appear here.
                      </p>
                    </div>
                  ) : (
                    savedRecipes.slice(0, 3).map((recipe) => (
                      <div key={recipe.id} className="dashboardSavedRecipeCard">
                        <p className="dashboardPanelLabel">Saved recipe</p>
                        <h3 className="dashboardSavedRecipeName dashboardCap">
                          {recipe.recipe_name}
                        </h3>
                        <p className="dashboardSavedRecipeText">
                          Added to your coffee space
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <aside className="dashboardRightColumn">
                <div className="dashboardRingPanel">
                  <div
                    className="dashboardCollectionRing"
                    style={{
                      background: `conic-gradient(#78ef8d 0deg ${
                        collectionPercent * 3.6
                      }deg, rgba(255,255,255,0.1) ${
                        collectionPercent * 3.6
                      }deg 360deg)`,
                    }}
                  >
                    <div className="dashboardCollectionRingInner">
                      <strong>{collectionPercent}%</strong>
                      <span>Collection</span>
                    </div>
                  </div>
                </div>

                <div className="dashboardActivityPanel">
                  <p className="dashboardPanelLabel">Activity logs</p>

                  <div className="dashboardActivityItem">
                    <span className="dashboardDot dashboardDotGreen" />
                    <div>
                      <strong>{totalSaved} recipes saved</strong>
                      <p>Your library is synced</p>
                    </div>
                  </div>

                  <div className="dashboardActivityItem">
                    <span className="dashboardDot dashboardDotBlue" />
                    <div>
                      <strong className="dashboardCap">{latestRecipe}</strong>
                      <p>Latest recipe added</p>
                    </div>
                  </div>

                  <div className="dashboardActivityItem">
                    <span className="dashboardDot dashboardDotOrange" />
                    <div>
                      <strong>{user.email}</strong>
                      <p>Signed in successfully</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}