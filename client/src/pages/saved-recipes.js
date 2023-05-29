import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://recipe-app-node-server.herokuapp.com/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);
  return (
    <div className="saved-recipe-container">
      <p className="home-title">Saved Recipes</p>
      <ul className="saved-recipes-list">
        {savedRecipes.map((recipe) => (
          <li className="saved-recipe-item" key={recipe._id}>
            <div>
              <p className="home-name">{recipe.name}</p>
            </div>
            <p>{recipe.instructions}</p>
            <figure className="home-image-wrapper">
            <img className="home-image" src={recipe.imageUrl} alt={recipe.name} />
            </figure>
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
