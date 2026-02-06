// 1. Importe os arquivos aqui. 
// O Vite vai cuidar de gerar o caminho final correto para o navegador.
import manualGlpi from '@/assets/Manual_GLPI_PGE_PA.pdf';
import tutorialSmartphone from '@/assets/Tutorial Nextcloud Smartphone.pdf';
import tutorialDesktop from '@/assets/Tutorial Nextcloud Desktop.pdf';
// import outroManual from '@/assets/Outro_Manual.pdf'; 

export interface ManualItem {
  id: string;
  title: string;
  file: string;
}

// 2. Exporte a lista
export const listaManuais: ManualItem[] = [
  {
    id: '1',
    title: 'Manual do GLPI',
    file: manualGlpi, // Usa a variável importada, não uma string
  },
  {
    id: '2',
    title: 'Guia de Instalação e Configuração: Nextcloud Desktop',
    file: tutorialDesktop, // Usa a variável importada, não uma string
  },
  {
    id: '3',
    title: 'Guia de Instalação e Configuração: Nextcloud Smartphone',
    file: tutorialSmartphone, // Usa a variável importada, não uma string
  }
];

// 3. Helper para facilitar a busca por ID (opcional, mas útil)
export const getManualById = (id: string | undefined) => {
    return listaManuais.find((manual) => manual.id === id);
};