import { Link } from "react-router-dom";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

export const UtilityNav = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate()

    const logout = () => {
        setCookies("access_token", "")
        window.localStorage.removeItem("userID")
        navigate("/auth")
    }

    return (
        <div className="utility-nav">
        {!cookies.access_token ? (
          <Link className="button primary" to="/auth"> Login/Register </Link>
        ) : (
          <button className="button primary" onClick={logout}>Logout</button>
        )}
      </div>
    )
  }
  
  