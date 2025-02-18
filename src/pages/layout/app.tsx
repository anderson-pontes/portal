import { Header } from "@/components/components_project/Header";
import { Outlet, useLocation } from "react-router-dom";
import './scrollbar.css'

export function AppLayout() {
  const { pathname } = useLocation();
  
  // Defina um conjunto de rotas que devem ficar sem padding
  const fullscreenPages = ["/camarasemfoco", "/panoramamunicipal", "/acompanhamentodeprodutividade"];
  const isFullscreenPage = fullscreenPages.includes(pathname);

  return (
    <div className="flex min-h-screen flex-col w-full antialiased">
      {/* Certifique-se de que o cabeçalho ocupa toda a largura */}
      <div className="sticky top-0 z-50 w-full">
        <Header />
      </div>

      {/* Ajuste de padding para páginas de tela cheia */}
      <div className={`flex flex-1 flex-col gap-4 w-screen overflow-auto ${isFullscreenPage ? "p-0" : "p-8 pt-6"} bg-blue-100`}>
        <Outlet />
      {/* Footer visível em todas as páginas */}
      <footer className="text-sm text-muted-foreground text-center p-6 w-full bg-blue-100">
        Copyright &copy; DTIGD {new Date().getFullYear()} | PGE-PA | Todos os direitos reservados.
      </footer>
      </div>

    </div>
  );
}
