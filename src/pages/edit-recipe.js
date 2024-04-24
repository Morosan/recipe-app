import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../hooks/useGetUserID";
import { Button } from "../components/button";

const EditRecipe = () => {
  const { recipeId } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserID();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [""],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `https://recipe-app-backend-ggcu.onrender.com/recipes/${recipeId}`
          // `http://localhost:3001/recipes/${recipeId}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

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
    setUpdateLoading(true);
    try {
      if (!userID) {
        throw new Error("User ID is null");
      }
      await axios.put(
        `https://recipe-app-backend-ggcu.onrender.com/recipes/${userID}/recipes/${recipeId}`
        // `http://localhost:3001/recipes/${userID}/recipes/${recipeId}`
        , recipe
        ,{
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Updated");
      setUpdateLoading(false);
      navigate(`/recipe/${recipeId}`);
    } catch (error) {
      setUpdateLoading(false);
      console.error(error);
    }
  };

  const deleteRecipe = async (event) => {
    event.preventDefault();
    setDeleteLoading(true)
    try {
      await axios.delete(
        `https://recipe-app-backend-ggcu.onrender.com/recipes/${recipeId}`
        // `http://localhost:3001/recipes/${recipeId}`,
        , {
          headers: { authorization: cookies.access_token },
        }
      );
  
      alert("Recipe Deleted");
      setDeleteLoading(false)
      navigate("/");
    } catch (error) {
      setDeleteLoading(false)
      console.error(error);
    }
  }

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="ghost-section"></section>
      <section className="container mb-5">
        <h1 className="main-heading mb-5">Edit Recipe:</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label" htmlFor="name">Name:</label>
            <input
              className="form-control"
              type="text"
              id="name"
              name="name"
              value={recipe.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="form-label mb-2" htmlFor="ingredients">Ingredients:</label>
            {recipe.ingredients.map((ingredient, index) => (
              <input
                className="form-control mb-3"
                key={index}
                type="text"
                name="ingredients"
                value={ingredient}
                onChange={(event) => handleIngredientChange(event, index)}
              />
            ))}
            <Button 
              className="button secondary" 
              type="button"
              onClick={handleAddIngredient}
            >
              Add Ingredient
            </Button>
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="instructions">Instructions:</label>
            <textarea
              className="form-control"
              id="instructions"
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="imageUrl">Image URL:</label>
            <input
              className="form-control"
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={recipe.imageUrl}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="cookingTime">Cooking Time (minutes):</label>
            <input
              className="form-control"
              type="number"
              id="cookingTime"
              name="cookingTime"
              value={recipe.cookingTime}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex">
            <Button 
              className="button primary me-3" 
              type="submit"
              isLoading={updateLoading}
            >
              Update Recipe
            </Button>
            <Button 
              className="button secondary danger" 
              type="button"
              isLoading={deleteLoading}
              onClick={deleteRecipe}
            >
              Delete Recipe
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditRecipe;
