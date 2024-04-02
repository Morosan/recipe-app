import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <ul className="main-nav">
      <li>
        <Link to="/"> Home </Link>
      </li>
      <li>
        <Link to="/create-recipe"> Create Recipe </Link>
      </li>
      <li>
        <Link to="/saved-recipes"> Saved Recipes </Link>
      </li>
    </ul>
  )
}