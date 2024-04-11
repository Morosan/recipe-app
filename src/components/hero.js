import { Button } from "./button"

export const Hero = () => {

    return (
      <div className="hero">
        <img className="hero-image" src="./hero-image.jpg" alt="Hero" />
        <div className="bg-helper"></div>
        <div className="hero-inner-wrapper">
          <h1 className="main-heading hero-title">Welcome to Cook Book</h1>
          <p className="paragraph hero-subtitle">Try new recipes, save your favorite ones, create your own masterpieces, and never run out of inspiration again!</p>
          <form>
            <label className="form-label" htmlFor="search">
              <i class="bi bi-search"></i>
              <input
                  type="text"
                  id="search"
                  className="form-control"
                  placeholder="What do you want to cook today?"
              />
            </label>
            <Button 
              className="button primary" 
              type="submit"
            >Search</Button>
          </form>
        </div>
      </div>
    )
  }
  