import { useState } from "react";
import { BookOpen, Home, Menu, Megaphone, Phone } from "lucide-react";
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
        <div className={`glass-header border-b border-white/20 ${isMenuOpen ? "mb-14" : ""}`}>
            <div className="flex h-16 items-center gap-6 justify-start w-screen">
                <div className="flex items-center gap-6 pl-6">
                    <div className="flex items-center gap-4 animate-slideIn">
                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-20 animate-pulse"></div>
                            <img
                                src={Logo}
                                alt="Logo PGE-PA"
                                className="relative mx-auto h-12 w-12 drop-shadow-lg transform hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="gradient-text text-2xl font-black tracking-tight">
                                SISTEMAS PGE
                            </span>
                            <span className="text-xs text-slate-500 font-medium -mt-1">
                                Procuradoria-Geral do Estado do Pará
                            </span>
                        </div>
                    </div>
                    <Separator orientation="vertical" className="h-8 hidden lg:block bg-gradient-to-b from-transparent via-slate-300/50 to-transparent" />
                </div>

                <button
                    className="lg:hidden mr-6 p-2 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    <Menu className="h-6 w-6 text-slate-700" />
                </button>

                {/* Menu Navigation */}
                <nav
                    className={`flex-col text-slate-700 lg:flex-row lg:flex items-start lg:items-center space-x-0 lg:space-x-6 lg:space-y-0 space-y-4 absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto p-4 lg:p-0 z-10 lg:z-auto transition-all duration-300 ease-in-out ${isMenuOpen ? "flex glass-header shadow-lg border-t border-white/20" : "hidden"
                        }`}
                >
                    <NavLink to="/" onClick={closeMenu}>
                        <div className="flex flex-row justify-center items-center gap-2 font-semibold text-slate-700 hover:text-blue-600 transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/20 hover:scale-105">
                            <Home className="h-5 w-5" />
                            Home
                        </div>
                    </NavLink>
                    <NavLink to="/ramais" onClick={closeMenu}>
                        <div className="flex flex-row justify-center items-center gap-2 font-semibold text-slate-700 hover:text-blue-600 transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/20 hover:scale-105">
                            <Phone className="h-5 w-5" />
                            Ramais
                        </div>
                    </NavLink>
                    <NavLink to="/manuais" onClick={closeMenu}>
                        <div className="flex flex-row justify-center items-center gap-2 font-semibold text-slate-700 hover:text-blue-600 transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/20 hover:scale-105">
                            <BookOpen className="h-5 w-5" />
                            Manuais
                        </div>
                    </NavLink>
                    <NavLink to="/avisos" onClick={closeMenu}>
                        <div className="flex flex-row justify-center items-center gap-2 font-semibold text-slate-700 hover:text-blue-600 transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/20 hover:scale-105">
                            <Megaphone className="h-5 w-5" />
                            Avisos
                        </div>
                    </NavLink>

                </nav>
            </div>

            {/* Custom animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-10px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
          .animate-slideIn { animation: slideIn 0.3s ease-out; }
        `
            }} />
        </div>
    );
}
