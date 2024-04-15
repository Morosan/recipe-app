import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditRecipe = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/${recipeId}`);
        setRecipe(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Recipe</h2>
      {/* Render the form to edit the recipe */}
    </div>
  );
};

export default EditRecipe;
