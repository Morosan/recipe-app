/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookies] = useCookies(["access_token"]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://recipe-app-backend-ggcu.onrender.com/recipes"
          // "http://localhost:3001/recipes"
        );
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://recipe-app-backend-ggcu.onrender.com/recipes/savedRecipes/ids/${userID}`
          // `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
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
      const response = await axios.put(
        "https://recipe-app-backend-ggcu.onrender.com/recipes"
        // "http://localhost:3001/recipes"
        , {
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
    <section className="container mb-5">
      <h1 className="main-heading mb-5">Recipes:</h1>
      
      <ul className="row">
        {recipes.map((recipe) => (
          <li className="col-lg-4 col-md-6" key={recipe._id}>
            <div className="card">
              <div href="/" className="img-wrapper">
                <img className="card-img" src={recipe.imageUrl} alt={recipe.name} />
              </div>
              <div className="card-inner-wrapper">
                <div className="title-wrapper">
                  <a href="/" className="card-title sub-heading">{recipe.name}</a>
                  {cookies.access_token && (
                    <button
                      className="button favorite"
                      onClick={() => saveRecipe(recipe._id)}
                      disabled={isRecipeSaved(recipe._id)}
                    >
                      {isRecipeSaved(recipe._id) ? (
                        <i class="bi bi-heart-fill"></i>
                      ) : (
                        <i class="bi bi-heart"></i>
                      )}
                    </button>
                  )}
                </div>
                <div className="paragraph instructions mb-">
                  {recipe.instructions}
                </div>
                <hr />
                <p className="paragraph">Cooking Time: {recipe.cookingTime} minutes</p>
              </div>

            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};