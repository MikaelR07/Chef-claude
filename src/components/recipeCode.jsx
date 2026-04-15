import ReactMarkdown from "react-markdown";
import { useState } from "react";
import "../index.css";

function parseRecipe(recipeText) {
  const lines = recipeText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const data = {
    heading: "Chef Claude Recommends:",
    intro: "",
    title: "",
    ingredients: [],
    instructions: [],
  };

  const headingIndex = lines.findIndex((line) =>
    /chef\s+claude\s+recommends/i.test(line),
  );
  if (headingIndex !== -1) {
    data.heading = lines[headingIndex].replace(/:$/, "");
  }

  const introIndex = lines.findIndex((line) =>
    /based on the ingredients/i.test(line),
  );
  if (introIndex !== -1) {
    data.intro = lines[introIndex];
  }

  const ingredientsIndex = lines.findIndex((line) =>
    /^(#+\s*)?ingredients\b/i.test(line),
  );
  const instructionsIndex = lines.findIndex((line) =>
    /^(#+\s*)?(instructions|directions|method)\b/i.test(line),
  );

  if (ingredientsIndex > -1) {
    const titleCandidate = lines[ingredientsIndex - 1];
    if (
      titleCandidate &&
      !/based on/i.test(titleCandidate) &&
      !/chef\s+claude\s+recommends/i.test(titleCandidate) &&
      !/^(#+\s*)?ingredients\b/i.test(titleCandidate)
    ) {
      data.title = titleCandidate.replace(/^#+\s*/, "");
    }
  }

  if (ingredientsIndex > -1) {
    const end = instructionsIndex > -1 ? instructionsIndex : lines.length;
    data.ingredients = lines
      .slice(ingredientsIndex + 1, end)
      .filter((line) => /^([-*•]\s+).+/.test(line))
      .map((line) => line.replace(/^[-*•]\s+/, ""));
  }

  if (instructionsIndex > -1) {
    const instructionLines = lines.slice(instructionsIndex + 1);
    const numbered = instructionLines
      .filter((line) => /^\d+[\.)]/.test(line))
      .map((line) => line.replace(/^\d+[\.)]\s*/, ""));

    if (numbered.length) {
      data.instructions = numbered;
    } else {
      data.instructions = instructionLines
        .filter((line) => /^([-*•]\s+).+/.test(line))
        .map((line) => line.replace(/^[-*•]\s+/, ""));
    }
  }

  return data;
}

export default function RecipeCode({ recipeText }) {
  const recipe = parseRecipe(recipeText || "");
  const hasStructured = recipe.ingredients.length && recipe.instructions.length;
  const [showMarkdown, setShowMarkdown] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(recipeText || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      setCopied(false);
    }
  }

  return (
    <section>
      <h2>{recipe.heading}</h2>
      <article className="suggested-recipe-container" aria-live="polite">
        {/* {!hasStructured && (
          <p className="recipe-fallback">
            The response format was a little different, so we’re showing the
            markdown directly.
          </p>
        )} */}
        <div className="recipe-actions">
          <button
            className="recipe-action-button"
            onClick={handleCopy}
            disabled={!recipeText}
          >
            {copied ? "Copied!" : "Copy recipe"}
          </button>
          {/* <button
            className="recipe-action-button secondary"
            onClick={() => setShowMarkdown((prev) => !prev)}
            disabled={!recipeText}
          >
            {showMarkdown ? "Hide markdown" : "Show markdown"}
          </button> */}
        </div>
        {hasStructured && (
          <div className="recipe-quickview">
            {recipe.intro && <p>{recipe.intro}</p>}
            {recipe.title && <h3>{recipe.title}</h3>}
            <strong>Ingredients:</strong>
            <ul>
              {recipe.ingredients.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <strong>Instructions:</strong>
            <ol>
              {recipe.instructions.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        )}
        {/* {showMarkdown && (
          <div className="recipe-markdown">
            <ReactMarkdown>{recipeText || "No recipe yet."}</ReactMarkdown>
          </div>
        )}
        {!hasStructured && !showMarkdown && (
          <div className="recipe-markdown">
            <ReactMarkdown>{recipeText || "No recipe yet."}</ReactMarkdown>
          </div>
        )} */}
      </article>
    </section>
  );
}
