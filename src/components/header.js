import { Logo } from "./logo"
import { Navbar } from "./navbar"
import { Hamburger } from "./hamburger"
import { UtilityNav } from "./utility-nav"

export const Header = () => {

    return (
        <header className="header container">
            <div className="w-100">
                <div className="desktop d-flex justify-content-between align-items-center">
                    <Hamburger />
                    <Logo />
                    <Navbar />
                    <UtilityNav />
                </div>
            </div>
        </header>
    )
}
  
  