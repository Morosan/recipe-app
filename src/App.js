import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Auth } from "./pages/auth";
import { CreateRecipe } from "./pages/create-recipe";
import { SavedRecipes } from "./pages/saved-recipes";
import { Navbar } from "./components/navbar";
import { Logo } from "./components/logo";
import { Footer } from "./components/footer";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import "./styles/index.scss";

function App() {
  return (
    <div className="App">
        <Router>
          <header className="header">
            <Logo />
            <Navbar />
          </header>
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/create-recipe" element={<CreateRecipe />} />
              <Route path="/saved-recipes" element={<SavedRecipes />} />
            </Routes>
          </main>

          <Footer />
        </Router>
    </div>
  );
}

export default App;
