import { useState } from "react";

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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.currentTarget);
    const formData = new FormData(e.currentTarget);
    const newIngredient = formData.get("ingredient");

    setIngredients((ingredientsArr) => [newIngredient, ...ingredientsArr]);
    e.currentTarget.reset();
  };

  return (
    <>
      <form className="recipe-form" onSubmit={handleSubmit}>
        <input
          className="recipe-input"
          type="text"
          placeholder="e.g flour, eggs, sugar..."
          name="ingredient"
        />
        <button type="submit"> Add ingredient</button>
      </form>
      {ingredientsList.length < 1 ? (
        <h1 className="no-ingredient">No ingredients added</h1>
      ) : (
        <>
          <h1 className="no-ingredient">Ingredients added:</h1>
          <ul className="ingredient-list">{ingredientsList}</ul>
        </>
      )}
    </>
  );
}
