import { useState } from "react"
import { Link } from "react-router-dom";

export const Hamburger = ({ open, setOpen }) => {

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen)
    }

    return (
        <div className="hamburger">
            <nav className="toggler-wrapper">
                <button className="navbar-toggler" onClick={() => toggleHamburger(!hamburgerOpen)}>
                    <i class="bi bi-list"></i>
                </button>
            </nav>
            <ul className="toggler-list">
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
        </div>
    )
  }
  
  