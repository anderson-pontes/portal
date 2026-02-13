import Carrossel from "@/components/Carrossel";
import { Helmet } from "react-helmet-async";

export default function AvisosPage() {
  return (
    <>
      <Helmet>
        <title>Avisos</title>
      </Helmet>
      <div className="min-h-screen relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section - igual à Home */}
          <div className="text-center mb-12 animate-slideIn pt-4">
            <h1 className="text-5xl md:text-6xl font-extrabold gradient-text mb-6 animate-scaleIn">
              Avisos
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed animate-fadeIn">
              Avisos e comunicados importantes para os servidores da PGE-PA
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 mx-auto rounded-full animate-scaleIn" />
          </div>
        </div>
          <Carrossel
            images={[
              "/src/assets/carnaval.jpg",
              "/src/assets/meditacao.jpg",
              "/src/assets/desafinar.jpg",
              "/src/assets/escuta_interna.jpg",
            ]}
            title="Avisos"
          />
      </div>
    </>
  );
}
