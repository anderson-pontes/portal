/**
 * Configuração do worker do PDF.js para react-pdf.
 * Deve ser importado uma vez na entrada da aplicação (main.tsx).
 */
import { pdfjs } from 'react-pdf'
// Worker do pdfjs-dist: Vite resolve e devolve a URL do asset
import workerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url'

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl
