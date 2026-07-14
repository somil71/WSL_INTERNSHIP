import React, { useState } from "react";
import api from "../utils/api";
import Loader from "./layout/Loader";

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const handleGenerateRecipe = async () => {
    if (!ingredients.trim()) {
      setError("Please enter ingredients");
      return;
    }

    setError("");
    setLoading(true);
    setRecipe("");

    try {
      const { data } = await api.post("/v1/ai/recipe/generate", {
        ingredients,
      });

      setRecipe(data.recipe);
      setHistory((prev) => [{ ingredients, recipe: data.recipe }, ...prev]);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipe-generator my-5">
      <h2>🍽️ AI Recipe Generator</h2>
      <p className="text-muted">
        Tell us what's in your fridge and we'll generate a simple recipe for
        you, powered by Groq / Llama 3.1.
      </p>

      <textarea
        className="form-control"
        placeholder="Enter ingredients (e.g. rice, onion, tomato)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        rows={4}
      />

      <button
        className="btn btn-primary mt-3"
        onClick={handleGenerateRecipe}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Recipe"}
      </button>

      {loading && <Loader />}

      {error && <p className="text-danger mt-3">{error}</p>}

      {recipe && (
        <pre className="recipe-output mt-4">{recipe}</pre>
      )}

      {history.length > 0 && (
        <div className="recipe-history mt-5">
          <h3>📜 Recipe History</h3>
          {history.map((item, index) => (
            <div className="recipe-history-item" key={index}>
              <strong>Ingredients:</strong>
              <p>{item.ingredients}</p>
              <strong>Recipe:</strong>
              <pre className="recipe-output">{item.recipe}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;
