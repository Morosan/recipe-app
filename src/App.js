import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Auth } from "./pages/auth";
import { CreateRecipe } from "./pages/create-recipe";
import { SavedRecipes } from "./pages/saved-recipes";
import { Footer } from "./components/footer";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/index.scss";
import { Header } from "./components/header";
import Recipe from "./pages/recipe";
import EditRecipe from "./pages/edit-recipe";

function App() {
  return (
    <div className="App">
        <Router>
          <Header />

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/create-recipe" element={<CreateRecipe />} />
              <Route path="/edit-recipe/:recipeId" element={<EditRecipe />} />
              <Route path="/saved-recipes" element={<SavedRecipes />} />
              <Route path="/recipe/:id" element={<Recipe />} />
            </Routes>
          </main>

          <Footer />
        </Router>
    </div>
  );
}

export default App;
