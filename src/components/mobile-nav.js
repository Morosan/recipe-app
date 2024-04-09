import { useState } from "react"
import { Link } from "react-router-dom";

export const MobileNav = ({ open, setOpen }) => {

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen)
    }

    const closeMobileNav = () => {
        setHamburgerOpen(false);
    };

    return (
        <div className="mobile-nav">
            <button className={`navbar-toggler ${hamburgerOpen ? "open" : ""}`} onClick={() => toggleHamburger(!hamburgerOpen)}>
                <i className="bi bi-list"></i>
            </button>
            <ul className={`toggler-list ${hamburgerOpen ? "open" : ""}`}>
                <li className="toggler-item">
                    <Link 
                        className="toggler-link" 
                        to="/"
                        onClick={closeMobileNav}
                    >
                        Home
                    </Link>
                </li>
                <li className="toggler-item">
                    <Link 
                        className="toggler-link" 
                        to="/create-recipe"
                        onClick={closeMobileNav}
                    >
                        Create Recipe
                    </Link>
                </li>
                <li className="toggler-item">
                    <Link 
                        className="toggler-link" 
                        to="/saved-recipes"
                        onClick={closeMobileNav}
                    >
                        Saved Recipes
                    </Link>
                </li>
                <li className="toggler-item">
                    <Link 
                        className="toggler-link" 
                        to="/auth"
                        onClick={closeMobileNav}
                    >
                        Login
                    </Link>
                </li>
                <li className="toggler-item">
                    <Link 
                        className="toggler-link" 
                        to="/auth"
                        onClick={closeMobileNav}
                    >
                        Register
                    </Link>
                </li>
            </ul>
        </div>
    )
  }
  
  