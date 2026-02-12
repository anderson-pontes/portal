import { Header } from "@/components/components_project/Header";
import { Outlet, useLocation } from "react-router-dom";
import './scrollbar.css'

export function AppLayout() {
  const { pathname } = useLocation();
  
  // Defina um conjunto de rotas que devem ficar sem padding
  const fullscreenPages = ["/camarasemfoco", "/panoramamunicipal", "/acompanhamentodeprodutividade", "/avisos"];
  const isFullscreenPage = fullscreenPages.includes(pathname);

  return (
    <div className="relative flex min-h-screen flex-col w-full antialiased overflow-hidden">
      {/* Background with modern gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Geometric patterns */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Header with Glass Morphism */}
      <div className="sticky top-0 z-50 w-full">
        <Header />
      </div>

      {/* Main Content */}
      <div className={`flex flex-1 flex-col gap-6 w-screen overflow-y-auto thin-scrollbar relative z-10 ${
        isFullscreenPage ? "p-0" : "px-4 py-8 md:px-8 lg:px-12"
      }`}>
        <div className="animate-fadeIn">
          <Outlet />
        </div>
      </div>
      
      {/* Modern footer */}
      <footer className="relative z-10 px-4 pb-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center space-x-2 backdrop-blur-md bg-white/20 border border-white/30 rounded-full px-6 py-3 shadow-lg">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <p className="text-sm font-medium text-gray-700">
              Copyright © PGE-PA {new Date().getFullYear()} | DTIGD
            </p>
          </div>
          <p className="mt-2 text-xs text-gray-500/80">
            Todos os direitos reservados
          </p>
        </div>
      </footer>

       {/* Custom CSS for animations */}
       <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob { animation: blob 7s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
        `
      }} />
    </div>
  );
}
