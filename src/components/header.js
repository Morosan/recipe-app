import { Logo } from "./logo"
import { Navbar } from "./navbar"
import { MobileNav } from "./mobile-nav"
import { UtilityNav } from "./utility-nav"
import { useEffect, useState } from "react"

export const Header = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); 

    return (
        <header className="header container">
            <div className="w-100">
                <div className="desktop d-flex justify-content-between align-items-center">
                    {isMobile && <MobileNav />}
                    <Logo />
                    {!isMobile && <Navbar />}
                    {!isMobile && <UtilityNav />}
                </div>
            </div>
        </header>
    )
}
  
  