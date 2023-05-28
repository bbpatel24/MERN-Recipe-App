import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe-container">
      <div className="create-recipe">
        <p className="home-title">Create Recipe</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={recipe.name}
            onChange={handleChange}
          />
          <textarea
            id="description"
            name="description"
            value={recipe.description}
            placeholder="Description"
            onChange={handleChange}
          ></textarea>

          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
            />
          ))}
          <button type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
          <textarea
            id="instructions"
            name="instructions"
            placeholder="Instructions"
            value={recipe.instructions}
            onChange={handleChange}
          ></textarea>

          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            placeholder="Image URL"
            value={recipe.imageUrl}
            onChange={handleChange}
          />
          <label htmlFor="cookingTime">Cooking Time (mins)</label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
          />
          <button className="register-button" type="submit">
            Create Recipe
          </button>
        </form>
      </div>
    </div>
  );
};
