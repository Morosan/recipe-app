import { Link } from "react-router-dom";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate()

  const logout = () => {
    
    setCookies("access_token", "")
    window.localStorage.removeItem("userID")
    navigate("/auth")
  }

  return (
    <>
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
      <div className="utility-nav">
        {!cookies.access_token ? (
          <Link to="/auth"> Login/Register </Link>
        ) : (
          <button className="button primary" onClick={logout}>Logout</button>
        )}
      </div>
    </>
  )
}