/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);

  const fetchSavedRecipes = async () => {
    try {
      const response = await axios.get(
        `https://recipe-app-backend-ggcu.onrender.com/recipes/savedRecipes/${userID}`
        // `http://localhost:3001/recipes/savedRecipes/${userID}`
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSavedRecipes();
  }, []);       
  
  const removeSavedRecipe = async (recipeID) => {
    console.log("trigger removeSavedRecipe")
    try {
      const response = await axios.delete(
        `https://recipe-app-backend-ggcu.onrender.com/recipes/${userID}/savedRecipes/${recipeID}`,
        // `http://localhost:3001/recipes/${userID}/savedRecipes/${recipeID}`,
        {
          headers: { authorization: cookies.access_token },
        }
      );
      // After removing the recipe, fetch the updated list of saved recipes
      fetchSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="container mb-5">
      <h1 className="main-heading mb-5">Saved Recipes:</h1>
      
      <ul className="row">
        {savedRecipes.map((recipe) => (
          <li className="col-lg-4 col-md-6" key={recipe._id}>
            <div className="card">
              <div href="/" className="img-wrapper">
                {recipe.imageUrl ? (
                  <img className="card-img" src={recipe.imageUrl} alt={recipe.name} />
                ) : (
                  <i className="bi bi-image"></i>
                )}
              </div>
              <div className="card-inner-wrapper">
                <div className="title-wrapper">
                  <Link 
                    to={`/recipe/${recipe._id}`}
                    className="card-title sub-heading"
                  >
                    {recipe.name}
                  </Link>
                </div>
                <div className="paragraph instructions mb-">
                  {recipe.instructions}
                </div>
                <hr />
                <p className="paragraph">Cooking Time: {recipe.cookingTime} minutes</p>
                <button
                  className="button favorite"
                  onClick={() => removeSavedRecipe(recipe._id)}
                  // disabled={!isRecipeSaved(recipe._id)}
                >
                  <i className="bi bi-heart-fill"></i>
                </button>
              </div>

            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};