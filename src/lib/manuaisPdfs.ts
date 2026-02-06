/**
 * Lista de PDFs de manuais via import.meta.glob (Vite).
 * Estrutura: id, categoria (slug), categoriaLabel, titulo (para exibição), nomeArquivo (download), url.
 */

const glob = import.meta.glob<string>(
  "/src/assets/manuais/**/*.pdf",
  { query: "?url", import: "default", eager: true }
);

const categoriaLabels: Record<string, string> = {
  "cloud pge": "Cloud PGE",
  glpi: "GLPI",
};

export interface ManualPdf {
  id: string;
  categoria: string;
  categoriaLabel: string;
  titulo: string;
  nomeArquivo: string;
  url: string;
}

function slugFromPath(pathKey: string): string {
  const parts = pathKey.replace(/\\/g, "/").split("/");
  const manuaisIndex = parts.indexOf("manuais");
  if (manuaisIndex >= 0 && parts[manuaisIndex + 1]) {
    return parts[manuaisIndex + 1];
  }
  return "";
}

/** Garante URL segura para fetch (evita 500 por espaços no path, ex.: "cloud pge"). */
function safeUrl(url: string): string {
  if (typeof url !== "string") return url;
  return url.replace(/ /g, "%20");
}

export const manuaisPdfs: ManualPdf[] = Object.entries(glob).map(
  ([pathKey, url], index) => {
    const normalized = pathKey.replace(/\\/g, "/");
    const parts = normalized.split("/");
    const nomeArquivo = parts[parts.length - 1] ?? "";
    const categoria = slugFromPath(pathKey);
    const categoriaLabel = categoriaLabels[categoria] ?? categoria;
    const titulo = nomeArquivo
      .replace(/\.pdf$/i, "")
      .replace(/_/g, " ")
      .trim();
    return {
      id: `manual-${index}`,
      categoria,
      categoriaLabel,
      titulo,
      nomeArquivo,
      url: safeUrl(url),
    };
  }
);
