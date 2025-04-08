import { useState } from "react";
import { Home, Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { NavLink } from "react-router-dom";
import Logo from "@/assets/logo.svg";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className={`border-b ${isMenuOpen ? "mb-14" : ""}`}>
            <div className="flex h-16 items-center gap-6 justify-start w-screen bg-gradient-to-r from-blue-400 to-indigo-600 shadow-lg">
                <div className="flex items-center gap-4 pl-6">
                    <span className="font-semibold text-indigo-50 flex items-center gap-3">
                        <img className="h-12 w-15" src={Logo} alt="Logo" />
                        ACESSO RÁPIDO
                    </span>
                    <Separator orientation="vertical" className="h-6 hidden lg:block" />
                </div>

                <button
                    className="lg:hidden"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >

                    <Menu className="h-6 w-6 text-indigo-50" />
                </button>

                {/* Menu Navigation */}
                <nav
                    className={`flex-col text-indigo-50 lg:flex-row lg:flex items-start lg:items-center space-x-0 lg:space-x-6 lg:space-y-0 space-y-4 absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto p-4 lg:p-0 z-10 lg:z-auto transition-all duration-300 ease-in-out ${
                        isMenuOpen ? "flex bg-blue-100 text-indigo-600" : "hidden"
                    }`}
                >
                    <NavLink to="/" onClick={closeMenu}>
                        <div className="flex flex-row justify-center items-center gap-2 font-semibold hover:text-indigo-300">
                            <Home className="h-5 w-5" />
                            Home
                        </div>
                    </NavLink>
                    
                </nav>
            </div>
        </div>
    );
}
