import { useState } from "react";
import GetRecipe from "./getRecipe";

export default function Form() {
  const ingredients = [];
  // const ingredientsList = ingredients.map((ingredient) => (
  //   <li key={ingredient}>{ingredient}</li>
  // ));
  const [ingredientsArr, setIngredients] = useState(ingredients);
  const ingredientsList = ingredientsArr.map((ingredient) => (
    <li className="ingredient" key={ingredient}>
      {ingredient}
    </li>
  ));
  const addIngredient = (formData) => {
    const newIngredient = formData.get("ingredient");

    setIngredients((ingredientsArr) => [newIngredient, ...ingredientsArr]);
  };

  return (
    <>
      <form action={addIngredient} className="recipe-form">
        <input
          className="recipe-input"
          type="text"
          placeholder="e.g flour, eggs, sugar..."
          name="ingredient"
        />
        <button type="submit"> Add ingredient</button>
      </form>
      {
        /* {ingredientsList.length < 1 ? (
        <h1 className="no-ingredient">No ingredients added</h1>
      ) : (
        <>
          <h1 className="no-ingredient">Ingredients added:</h1>
          <ul className="ingredient-list">{ingredientsList}</ul>
          <GetRecipe />
        </>
      )} */

        ingredientsList.length > 0 && (
          <>
            <h1 className="no-ingredient">Ingredients added:</h1>
            <ul className="ingredient-list">{ingredientsList}</ul>
            {ingredientsList.length > 3 && (
              <GetRecipe ingredients={ingredientsArr} />
            )}
          </>
        )
      }
    </>
  );
}
