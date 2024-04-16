/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie"
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { Hero } from "../components/hero";
import { Spinner } from "react-bootstrap";
import { Button } from "../components/button";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchError, setSearchError] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [numRecipesToShow, setNumRecipesToShow] = useState(9); // Initial number of recipes to display
  const userID = useGetUserID();


  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        "https://recipe-app-backend-ggcu.onrender.com/recipes"
        // "http://localhost:3001/recipes"
      );
      const fetchedRecipes = response.data;
      setRecipes(fetchedRecipes);
      setFilteredRecipes(fetchedRecipes.slice(0, numRecipesToShow)); // Display initial number of recipes
      setLoading(false);
      if (fetchedRecipes.length > numRecipesToShow) {
        setShowMore(true); // Show "Load More" button if there are more recipes
      }
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setLoading(false);
    }
  };

  const loadMoreRecipes = () => {
    setNumRecipesToShow(numRecipesToShow + 10); // Increase the number of recipes to display
    setFilteredRecipes(recipes.slice(0, numRecipesToShow + 10)); // Update filtered recipes with additional recipes
    if (recipes.length <= numRecipesToShow + 10) {
      setShowMore(false); // Hide "Load More" button if all recipes are displayed
    }
  };

  const fetchSavedRecipes = async () => {
    try {
      if (userID) {
        const response = await axios.get(
          `https://recipe-app-backend-ggcu.onrender.com/recipes/savedRecipes/ids/${userID}`
          // `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } else {
        setSavedRecipes([]); // Set saved recipes to empty array
      }
    } catch (err) {
      console.error("Error fetching saved recipes:", err);
    }
  };

  useEffect(() => {

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

  const removeSavedRecipe = async (recipeID) => {
    try {
      await axios.delete(
        `https://recipe-app-backend-ggcu.onrender.com/recipes/${userID}/savedRecipes/${recipeID}`
        // `http://localhost:3001/recipes/${userID}/savedRecipes/${recipeID}`
        , {
        headers: { authorization: cookies.access_token },
      });
      setSavedRecipes(savedRecipes.filter(id => id !== recipeID));
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes && savedRecipes.includes(id);

  const isRecipeOwner = (recipe) => {
    return recipe.userOwner === userID;
  };

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
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : searchError ? (
          <h2>Error: No recipe was found with that name.</h2>
        ) : (
          <>
            <ul className="row">
              {filteredRecipes.map((recipe) => (
                <li className="col-lg-4 col-md-6 mb-4" key={recipe._id}>
                  <div className="card flex-fill">
                    <div href="/" className="img-wrapper">
                      {recipe.imageUrl ? (
                        <img className="card-img" src={recipe.imageUrl} alt={recipe.name} />
                      ) : (
                        <i className="bi bi-image"></i>
                      )}

                      {cookies.access_token && (
                        <Button
                          type="button"
                          className="button favorite"
                          onClick={() => {
                            if (isRecipeSaved(recipe._id)) {
                              removeSavedRecipe(recipe._id);
                            } else {
                              saveRecipe(recipe._id);
                            }
                          }}
                        >
                          {isRecipeSaved(recipe._id) ? (
                            <i className="bi bi-heart-fill"></i>
                          ) : (
                            <i className="bi bi-heart "></i>
                          )}
                        </Button>
                      )}
                    </div>
                    <div className="card-body d-flex flex-column card-inner-wrapper d-flex flex-column">
                      <div className="title-wrapper mb-auto">
                        <Link 
                          to={`/recipe/${recipe._id}`}
                          className="card-title sub-heading"
                        >
                          {recipe.name}
                        </Link> 
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="paragraph">Cooking Time: {recipe.cookingTime} minutes</p>
                        {isRecipeOwner(recipe) && (
                          <Link to={`/edit-recipe/${recipe._id}`} className="edit-button">
                            Edit
                          </Link>
                        )}
                      </div>
                    </div>

                  </div>
                </li>
              ))}
            </ul>
            {showMore && (
              <div className="d-flex justify-content-center mt-5">
                <Button 
                  className="button primary" 
                  type="button"
                  onClick={loadMoreRecipes}
                >
                  Load More
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};