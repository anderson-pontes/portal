import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";

interface CarrosselProps {
  images: string[];
}

export default function Carrossel({ images }: CarrosselProps) {
  const [index, setIndex] = useState(0);
  const [isFull, setIsFull] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Navegação unificada (Mágica do Módulo %)
  const navigate = useCallback(
    (direction: "next" | "prev") => {
      setIndex((prev) => {
        const total = images.length;
        if (direction === "next") return (prev + 1) % total;
        return (prev - 1 + total) % total;
      });
    },
    [images.length],
  );

  // Autoplay e Fullscreen Listener
  useEffect(() => {
    const autoPlay = setInterval(() => navigate("next"), 5000);

    const handleFullChange = () => {
      setIsFull(!!document.fullscreenElement);
      if (document.fullscreenElement) setShowControls(true);
    };

    document.addEventListener("fullscreenchange", handleFullChange);

    return () => {
      clearInterval(autoPlay);
      document.removeEventListener("fullscreenchange", handleFullChange);
    };
  }, [navigate]);

  // Controle de Mouse (Inatividade)
  const handleMouseMove = () => {
    if (!isFull) return;
    setShowControls(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setShowControls(false), 3000);
  };

  const toggleFull = async () => {
    if (!document.fullscreenElement)
      await containerRef.current?.requestFullscreen();
    else await document.exitFullscreen();
  };

  if (!images.length) return null;

  return (
    // Wrapper externo para layout da página
    <div
      className={
        isFull ? "fixed inset-0 z-50" : "w-full max-w-4xl mx-auto px-4 py-6"
      }
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        // AQUI ESTÁ A GRANDE SIMPLIFICAÇÃO DE CSS:
        // 1. aspect-square: Substitui o padding-top hack.
        // 2. group: Permite hover no modo janela.
        className={`animate-slideIn relative overflow-hidden shadow-lg transition-all duration-300 group
          ${
            isFull
              ? `w-screen h-screen bg-black flex items-center justify-center rounded-none ${!showControls && "cursor-none"}`
              : "w-full aspect-square rounded-lg"
          }`}
      >
        <img
          src={images[index]}
          alt={`Slide ${index + 1}`}
          className={`transition-all duration-500 
            ${
              isFull
                ? "w-full h-auto landscape:h-full landscape:w-auto object-contain"
                : "absolute inset-0 w-full h-full object-cover"
            }`}
        />

        {/* --- CONTROLES (Visíveis se: Fullscreen+Timer Ativo OU Janela+Hover) --- */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 
          ${(isFull && showControls) || !isFull ? "opacity-100 md:opacity-0 md:group-hover:opacity-100" : "opacity-0"}`}
        >
          <button
            onClick={toggleFull}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition"
          >
            {isFull ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
          </button>

          <button
            onClick={() => navigate("prev")}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 backdrop-blur-sm"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={() => navigate("next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 backdrop-blur-sm"
          >
            <ChevronRight size={32} />
          </button>

          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm">
            {index + 1} / {images.length}
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition shadow-md ${i === index ? "bg-blue-500 scale-110" : "bg-white/50 hover:bg-white"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
