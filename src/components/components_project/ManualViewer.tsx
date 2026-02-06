import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getManualById } from "@/data/manuaisData";


export default function ManualViewer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Busca o manual usando a função que criamos no arquivo de dados
  const manual = getManualById(id);
  
  // Lógica do botão voltar (simplificada para voltar 1 passo no histórico)
  const handleBack = () => {
    navigate(-1); 
  };

  // Se não achar o manual, mostra erro
  if (!manual) {
    return (
      <>
        <Helmet title="Manual não encontrado" />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] gap-4">
          <p className="text-gray-600 dark:text-gray-400">Documento não encontrado</p>
          <Button onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>
      </>
    );
  }

  // Função de Download
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = manual.file;
    link.download = `${manual.title}.pdf`; // Nome que será salvo no PC do usuário
    link.click();
  };

  return (
    <>
      <Helmet title={manual.title} />
      {/* Container principal - Altura total da tela */}
      <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-950">
        
        {/* Header - Mantendo o estilo visual do seu exemplo */}
        <div className="flex-shrink-0 m-4 mb-0">
          <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-t-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            
            {/* Botão Voltar + Título */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBack}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <h1 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                {manual.title}
              </h1>
            </div>

            {/* Botão Download */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Download</span>
            </Button>
          </div>
        </div>

        {/* PDF Viewer - Ocupando o resto da tela */}
        <div className="flex-1 mx-4 mb-4">
          <iframe
            src={manual.file}
            className="w-full h-full border border-t-0 border-gray-200 dark:border-gray-800 rounded-b-xl shadow-lg bg-white"
            title={manual.title}
          />
        </div>
      </div>
    </>
  );
}