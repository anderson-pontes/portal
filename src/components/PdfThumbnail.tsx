import { useState } from "react";
import { Document, Page } from "react-pdf";
import { FileText } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

const THUMB_WIDTH = 280;

interface PdfThumbnailProps {
  url: string;
  className?: string;
}

/**
 * Renderiza a primeira página do PDF como thumbnail em um canvas.
 * Exibe loading (ícone FileText) até carregar e fallback em caso de erro.
 */
export function PdfThumbnail({ url, className = "" }: PdfThumbnailProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const onLoadSuccess = () => {
    setLoading(false);
    setError(false);
  };

  const onLoadError = () => {
    setLoading(false);
    setError(true);
  };

  if (error) {
    return (
      <div
        className={`aspect-[4/3] rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/40 dark:via-indigo-950/40 dark:to-purple-950/40 flex items-center justify-center border border-slate-200/60 dark:border-white/10 ${className}`}
        aria-hidden
      >
        <FileText className="h-16 w-16 text-slate-400 dark:text-slate-500" />
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800/50 border border-slate-200/60 dark:border-white/10 flex items-center justify-center ${className}`}
    >
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/40 dark:via-indigo-950/40 dark:to-purple-950/40 rounded-2xl">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" aria-hidden />
          <span className="text-xs text-slate-500 dark:text-slate-400 sr-only">Carregando miniatura...</span>
        </div>
      )}
      <Document
        file={url}
        onLoadSuccess={onLoadSuccess}
        onLoadError={onLoadError}
        loading=""
        className="flex items-center justify-center min-h-full"
      >
        <Page
          pageNumber={1}
          width={THUMB_WIDTH}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className="!max-w-full !h-auto"
        />
      </Document>
    </div>
  );
}
