import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3000/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="home">
    <div className="home-container">
    <p className="home-title">Recipes</p>
    <ul className="home-list">
    {recipes.map((recipe) => (
      <li className="home-list-item" key={recipe._id}>
            <div>
              <p className="home-name">{recipe.name}</p>
              </div>
              <p className="home-cook-time">Cooking Time: {recipe.cookingTime} minutes</p>
              <div className="home-instructions">
              <p className="home-instructions-information">Instructions: {recipe.instructions}</p>
              </div>
              <figure className="home-image-wrapper">
              <img className="home-image" src={recipe.imageUrl} alt={recipe.name} />
              </figure>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
                className="home-button"
                >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
          </li>
        ))}
        </ul>
        </div>
        </div>
        );
      };
