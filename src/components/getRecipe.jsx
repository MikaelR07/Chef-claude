import { useState } from "react";
import RecipeCode from "./recipeCode";
import { getRecipeFromMistral } from "../../ai";

export default function GetRecipe({ ingredients }) {
  const [recipeShown, setRecipeShown] = useState(false);
  const [recipeText, setRecipeText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function getRecipe() {
    setIsLoading(true);
    setError("");
    try {
      const recipeMarkdown = await getRecipeFromMistral(ingredients);
      setRecipeText(recipeMarkdown || "");
      setRecipeShown(true);
    } catch (err) {
      setError("Sorry, something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="recipe-request">
        <div className="get-recipe">
          <h1>Ready for a recipe?</h1>
          <p>Generate a recipe from your list of ingredients.</p>
        </div>
        <button
          onClick={getRecipe}
          className="get-recipe-button"
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Get a recipe"}
        </button>
      </div>
      {isLoading && (
        <p className="status-message loading">Generating your recipe...</p>
      )}
      {error && <p className="status-message error">{error}</p>}
      {recipeShown && <RecipeCode recipeText={recipeText} />}
    </>
  );
}
