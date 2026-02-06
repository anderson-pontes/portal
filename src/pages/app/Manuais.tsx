import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom"; // <--- 1. IMPORTE O LINK
import { ExternalLink, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listaManuais } from "@/data/manuaisData";

export default function Manuais() {
  return (
    <>
      <Helmet title="Manuais" />
      <div className="min-h-screen relative">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-slideIn">
            <h1 className="text-5xl md:text-6xl font-extrabold gradient-text mb-6 animate-scaleIn">
              Sistemas PGE-PA
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed animate-fadeIn">
              Manuais e Documentações dos Sistemas da Procuradoria-Geral do
              Estado do Pará
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 mx-auto rounded-full animate-scaleIn" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {listaManuais.map((manual) => (
              /* 2. TROQUE A TAG <a> PELA TAG <Link> */
              <Link
                key={manual.id}
                to={`/manuais/${manual.id}`} /* Use 'to' em vez de 'href' */
                className="group"
                /* Removi o target="_blank" para abrir na mesma aba, criando o efeito de SPA */
              >
                <Card className="h-full hover:shadow-lg transition-all duration-200 border-gray-200 dark:border-gray-800 hover:border-violet-300 dark:hover:border-violet-700">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-base font-medium text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {manual.title}
                    </CardTitle>
                    <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30">
                      <FileText className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <ExternalLink className="h-4 w-4" />
                      <span>Clique para visualizar</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}