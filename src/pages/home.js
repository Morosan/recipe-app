/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie"
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { Hero } from "../components/hero";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchError, setSearchError] = useState(false);


  const userID = useGetUserID();


  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://recipe-app-backend-ggcu.onrender.com/recipes"
          // "http://localhost:3001/recipes"
        );
        setRecipes(response.data);
        setFilteredRecipes(response.data); 
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
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
  }, [userID]);

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

  const filterRecipes = (query) => {
    setSearchError(false); // Reset search error
    if (!query) {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRecipes(filtered);
      if (filtered.length === 0) {
        setSearchError(true); // Set search error if no recipes found
      }
    }
  };

  return (
    <>
      <Hero setFilteredRecipes={filterRecipes}/>
      <section className="container mb-5">
        <h2 className="main-heading mb-5">Recipes:</h2>
        {loading ? (
          <div>Loading...</div>
        ) : searchError ? (
          <h2>Error: No recipe was found with that name.</h2>
        ) : (
          <ul className="row">
            {filteredRecipes.map((recipe) => (
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
                      {cookies.access_token && (
                        <button
                          className="button favorite"
                          onClick={() => saveRecipe(recipe._id)}
                          disabled={isRecipeSaved(recipe._id)}
                        >
                          {isRecipeSaved(recipe._id) ? (
                            <i className="bi bi-heart-fill"></i>
                          ) : (
                            <i className="bi bi-heart"></i>
                          )}
                        </button>
                      )}
                    </div>
                    <hr />
                    <p className="paragraph">Cooking Time: {recipe.cookingTime} minutes</p>
                  </div>

                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};