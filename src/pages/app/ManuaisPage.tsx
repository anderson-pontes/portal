import { Helmet } from "react-helmet-async";
import { useCallback, useMemo, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import { manuaisPdfs, type ManualPdf } from "@/lib/manuaisPdfs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PdfThumbnail } from "@/components/PdfThumbnail";
import { FileText, Search, Eye, Download, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { toast } from "sonner";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

type CategoriaAtiva = "todos" | "cloud pge" | "glpi";

const TABS: { value: CategoriaAtiva; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "cloud pge", label: "Cloud PGE" },
  { value: "glpi", label: "GLPI" },
];

function filterManuais(
  lista: ManualPdf[],
  categoriaAtiva: CategoriaAtiva,
  busca: string
): ManualPdf[] {
  const term = busca.trim().toLowerCase();
  return lista.filter((item) => {
    const matchCategoria =
      categoriaAtiva === "todos" || item.categoria === categoriaAtiva;
    const matchBusca =
      !term ||
      item.titulo.toLowerCase().includes(term) ||
      item.categoriaLabel.toLowerCase().includes(term);
    return matchCategoria && matchBusca;
  });
}

export default function ManuaisPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState<CategoriaAtiva>("todos");
  const [busca, setBusca] = useState("");
  const [manualAberto, setManualAberto] = useState<ManualPdf | null>(null);
  const [numPagina, setNumPagina] = useState(1);
  const [numPaginas, setNumPaginas] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [pageOriginalWidth, setPageOriginalWidth] = useState<number | null>(null);
  const [inputPagina, setInputPagina] = useState("");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const viewerContainerRef = useRef<HTMLDivElement>(null);

  const listagemFiltrada = useMemo(
    () => filterManuais(manuaisPdfs, categoriaAtiva, busca),
    [categoriaAtiva, busca]
  );

  const abrirVisualizador = (item: ManualPdf) => {
    setManualAberto(item);
    setNumPagina(1);
    setNumPaginas(null);
    setScale(1);
    setPageOriginalWidth(null);
    setInputPagina("");
  };

  const fecharVisualizador = () => {
    setManualAberto(null);
    setNumPagina(1);
    setNumPaginas(null);
    setPageOriginalWidth(null);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPaginas(numPages);
  };

  const onPageLoadSuccess = useCallback((page: { originalWidth: number }) => {
    setPageOriginalWidth(page.originalWidth);
  }, []);

  const ajustarLargura = useCallback(() => {
    const container = viewerContainerRef.current;
    if (!container || pageOriginalWidth == null) return;
    const w = container.clientWidth;
    if (w > 0) setScale(w / pageOriginalWidth);
  }, [pageOriginalWidth]);

  const irParaPagina = useCallback(() => {
    const n = parseInt(inputPagina, 10);
    if (numPaginas != null && !Number.isNaN(n) && n >= 1 && n <= numPaginas) {
      setNumPagina(n);
      setInputPagina("");
    }
  }, [inputPagina, numPaginas]);

  const handleDownloadClick = (item: ManualPdf) => {
    setDownloadingId(item.id);
    toast.success("Download iniciado");
    window.setTimeout(() => setDownloadingId(null), 1500);
  };

  return (
    <>
      <Helmet>
        <title>Manuais</title>
      </Helmet>
      <div className="min-h-screen relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section - igual à Home */}
          <div className="text-center mb-12 animate-slideIn pt-4">
            <h1 className="text-5xl md:text-6xl font-extrabold gradient-text mb-6 animate-scaleIn">
              Manuais
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed animate-fadeIn">
              Manuais e documentação dos sistemas PGE-PA
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 mx-auto rounded-full animate-scaleIn" />
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 animate-fadeIn">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setCategoriaAtiva(tab.value)}
                aria-pressed={categoriaAtiva === tab.value}
                aria-label={`Filtrar por ${tab.label}`}
                className={`rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  categoriaAtiva === tab.value
                    ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-purple-500/25"
                    : "bg-white/60 dark:bg-white/10 text-slate-600 hover:bg-white/80 hover:text-slate-800 hover:gradient-text border border-slate-200/60 dark:border-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Barra de busca */}
          <div className="relative mb-8 max-w-xl animate-fadeIn">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <Input
              type="search"
              placeholder="Buscar manuais..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              aria-label="Buscar manuais"
              className="pl-10 rounded-2xl border-slate-200/60 bg-white/60 dark:bg-white/10 dark:border-white/10"
            />
          </div>

          {/* Grid de cards ou empty state */}
          {listagemFiltrada.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
              {listagemFiltrada.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative glass-card rounded-3xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 overflow-hidden animate-slideIn hover:scale-[1.02]"
                  style={{ animationDelay: `${Math.min(index * 0.08, 0.5)}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-6 flex flex-col h-full">
                    {/* Thumbnail: primeira página do PDF */}
                    <PdfThumbnail url={item.url} className="mb-4" />
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:gradient-text transition-all duration-300 line-clamp-2">
                      {item.titulo}
                    </h3>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-4">
                      {item.categoriaLabel}
                    </span>
                    <div className="mt-auto flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        className="btn-gradient border-0 text-white rounded-xl flex-1 min-w-[100px]"
                        aria-label={`Visualizar ${item.titulo}`}
                        onClick={() => abrirVisualizador(item)}
                      >
                        <Eye className="h-4 w-4 mr-1.5" />
                        Visualizar
                      </Button>
                      <a
                        href={item.url}
                        download={item.nomeArquivo}
                        className="inline-flex"
                        onClick={() => handleDownloadClick(item)}
                        aria-label={`Baixar ${item.nomeArquivo}`}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-xl flex-1 min-w-[100px] border-slate-200 dark:border-white/20"
                          aria-label={downloadingId === item.id ? "Baixando..." : `Baixar ${item.nomeArquivo}`}
                          disabled={downloadingId === item.id}
                        >
                          {downloadingId === item.id ? (
                            <>
                              <span className="h-4 w-4 mr-1.5 animate-spin rounded-full border-2 border-slate-400 border-t-transparent inline-block" />
                              Baixando...
                            </>
                          ) : (
                            <>
                              <Download className="h-4 w-4 mr-1.5" />
                              Download
                            </>
                          )}
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="glass-card rounded-3xl text-center py-16 px-6 mb-12 animate-fadeIn border border-slate-200/60 dark:border-white/10"
              role="status"
              aria-live="polite"
              aria-label="Nenhum manual encontrado"
            >
              <FileText className="h-14 w-14 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
                Nenhum manual encontrado
              </p>
              <p className="text-slate-500 dark:text-slate-500 text-sm mt-1">
                Tente outro filtro ou termo de busca.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Dialog visualizador de PDF */}
      <Dialog open={!!manualAberto} onOpenChange={(open) => !open && fecharVisualizador()}>
        <DialogContent
          className="max-w-[95vw] w-full max-h-[90vh] flex flex-col gap-4 border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-0"
          aria-label="Visualizador de PDF"
        >
          {manualAberto && (
            <>
              <DialogHeader className="px-6 pt-6 pb-2 border-b border-slate-200 dark:border-white/10">
                <DialogTitle className="gradient-text text-xl pr-8">
                  {manualAberto.titulo}
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-wrap items-center gap-2 px-6 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-white/10">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  disabled={numPagina <= 1}
                  onClick={() => setNumPagina((p) => Math.max(1, p - 1))}
                  aria-label="Página anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  disabled={numPaginas === null || numPagina >= numPaginas}
                  onClick={() => setNumPagina((p) => Math.min(numPaginas ?? p, p + 1))}
                  aria-label="Próxima página"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <span className="text-sm text-slate-600 dark:text-slate-400 ml-2" aria-live="polite">
                  Página {numPagina}{numPaginas !== null ? ` de ${numPaginas}` : ""}
                </span>
                {numPaginas != null && numPaginas > 1 && (
                  <div className="flex items-center gap-1">
                    <label htmlFor="ir-pagina-input" className="sr-only">
                      Ir para página
                    </label>
                    <Input
                      id="ir-pagina-input"
                      type="number"
                      min={1}
                      max={numPaginas}
                      placeholder="Pág."
                      value={inputPagina}
                      onChange={(e) => setInputPagina(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && irParaPagina()}
                      className="w-16 h-8 text-center text-sm rounded-lg"
                      aria-label="Número da página"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-lg h-8"
                      onClick={irParaPagina}
                      aria-label="Ir para a página informada"
                    >
                      Ir
                    </Button>
                  </div>
                )}
                <div className="flex gap-1 ml-auto">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-xl"
                    disabled={pageOriginalWidth == null}
                    onClick={ajustarLargura}
                    aria-label="Ajustar à largura"
                    title="Ajustar à largura"
                  >
                    <Maximize2 className="h-4 w-4 sm:mr-1" />
                    <span className="hidden sm:inline">Largura</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-xl"
                    onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}
                    aria-label="Reduzir zoom"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-slate-600 dark:text-slate-400 self-center min-w-[3rem]" aria-hidden>
                    {Math.round(scale * 100)}%
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-xl"
                    onClick={() => setScale((s) => Math.min(2, s + 0.25))}
                    aria-label="Aumentar zoom"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div
                ref={viewerContainerRef}
                className="flex-1 overflow-auto px-6 pb-6 min-h-[70vh] flex flex-col"
                style={{ maxHeight: "70vh" }}
              >
                <Document
                  file={manualAberto.url}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={
                    <div className="flex-1 min-h-[70vh] flex flex-col items-center justify-center gap-3" aria-busy="true" aria-label="Carregando PDF...">
                      <div className="h-12 w-12 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                      <p className="text-sm text-slate-600 dark:text-slate-400">Carregando documento...</p>
                    </div>
                  }
                >
                  <Page
                    pageNumber={numPagina}
                    scale={scale}
                    onLoadSuccess={onPageLoadSuccess}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    className="flex justify-center"
                  />
                </Document>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
