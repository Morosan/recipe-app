import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Button } from "../components/button";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  // eslint-disable-next-line no-unused-vars
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [""],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });
  const [isLoading, setLoading] = useState(false);


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
    setLoading(true)
    try {
      if (!userID) {
        throw new Error("User ID is null");
      }
      await axios.post(
        "https://recipe-app-backend-ggcu.onrender.com/recipes",
        // "http://localhost:3001/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      setLoading(false)
      navigate("/");
    } catch (error) {
      setLoading(false)
      console.error(error);
    }
  };

  return (
    <>
      <section className="container mb-5">
        <h1 className="main-heading mb-5">Create Recipe</h1>
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
          <Button 
            className="button primary" 
            type="submit"
            isLoading={isLoading}
          >
            Create Recipe
          </Button>
        </form>
      </section>
    </>
  );
};