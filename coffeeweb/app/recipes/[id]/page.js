"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function RecipePage() {
  const router = useRouter();
  const params = useParams();
  const [msg, setMsg] = useState("");

  async function saveRecipe() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const recipeId = params.id;

    const { error } = await supabase.from("saved_recipes").insert({
      user_id: user.id,
      recipe_name: recipeId,
    });

    if (error) {
      setMsg(error.message);
      return;
    }

    setMsg("Recipe saved!");
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Recipe: {params.id}</h1>

      <button
        onClick={saveRecipe}
        style={{
          marginTop: 20,
          padding: "10px 18px",
          borderRadius: 10,
          background: "#c7a17a",
          border: "none",
          cursor: "pointer",
        }}
      >
        Save Recipe
      </button>

      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
    </main>
  );
}