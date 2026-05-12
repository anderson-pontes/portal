import { Helmet } from "react-helmet-async";
import imgBancoPareceres from "@/assets/armazenamento-de-banco-de-dados.png";
import imgSida from "@/assets/logosida.png";
import imgLexPge from "@/assets/pcon.png";
import imgBuscaDoe from "@/assets/busca.png";
import imgSuporteDtigd from "@/assets/suporte.png";
import imgNuvem from "@/assets/nuvem.png";
import imgGdap from "@/assets/gdap.png";
import imgSigescon from "@/assets/contrato.png";
import imgEadEsap from "@/assets/ead-esap.png";
// import imgJurisPge from "@/assets/juris-pge.png";
import imgNcaDigital from "@/assets/nca-digital.png";
import imgSistemasLegados from "@/assets/sistemas-legados.png";
import imgAttusPge from "@/assets/attus.png";
import imgZimbra from "@/assets/zimbra.png";
import imgPje from "@/assets/pje.png";
import imgProdepa from "@/assets/prodepa.png";
import imgBrasaoPge from "@/assets/logo.svg";
import imgTrt8 from "@/assets/trt8.png";
import imgTrf1 from "@/assets/trf1.png";
import { Link } from "react-router-dom";
import { CircleHelp, ExternalLink, Link2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Flashcard = {
  title: string;
  description: string;
  image: string;
  externalLink?: string;
};

export function Home() {
  const flashcards: Flashcard[] = [
    {
      title: "SIGESCON",
      description: "Sistema de Gestão de Contratos",
      image: imgSigescon,
      externalLink: "http://sigescon.pge.pa.gov.br/",
    },
    {
      title: "SIDA",
      description: "Sistema de Inteligência da Procuradoria da Dívida Ativa",
      image: imgSida,
      externalLink: "https://sida.pge.pa.gov.br",
    },
    {
      title: "LEXPGE",
      description:
        "Base de Atos Normativos da Procuradoria-Geral do Estado do Pará",
      image: imgLexPge,
      externalLink: "https://lex.pge.pa.gov.br/",
    },
    {
      title: "BUSCA DOE",
      description:
        "Sistema de Busca Avançado de Diários Oficiais do Estado do Pará",
      image: imgBuscaDoe,
      externalLink: "http://buscadoe.pge.pa.gov.br/",
    },
    {
      title: "SUPORTE DTI",
      description:
        "Sistema de Suporte da Diretoria de Tecnologia da Informação",
      image: imgSuporteDtigd,
      externalLink: "http://suportedti.pge.pa.gov.br/",
    },
    {
      title: "CLOUD PGE",
      description:
        "Sistema de Armazenamento de Arquivos da Procuradoria-Geral do Estado do Pará",
      image: imgNuvem,
      externalLink: "https://cloud.pge.pa.gov.br/",
    },
    {
      title: "GDAP",
      description: "Gratificação de Desempenho de Apoio à Procuradoria",
      image: imgGdap,
      externalLink: "http://10.96.0.51/",
    },
    {
      title: "e-CONSULTA",
      description: "Sistema de Consulta de Processos do e-PGE",
      image: imgBancoPareceres,
      externalLink: "http://10.96.0.54:4000",
    },
    {
      title: "EAD ESAP",
      description: "Plataforma de Ensino a Distância da ESAP",
      image: imgEadEsap,
      externalLink: "https://eadesap.pge.pa.gov.br",
    },
    // {
    //   title: "JURIS PGE-PA",
    //   description: "Base Unificada de Jurisprudências",
    //   image: imgJurisPge,
    //   externalLink: "https://juris.pge.pa.gov.br",
    // },
    {
      title: "NCA DIGITAL",
      description:
        "Plataforma para gerenciamento de solicitações de Análise de Prescrição e Carta de Anuência",
      image: imgNcaDigital,
      externalLink: "https://nca.pge.pa.gov.br",
    },
    {
      title: "SISTEMAS LEGADOS",
      description: "Plataforma Integrada de Sistemas Legados",
      image: imgSistemasLegados,
      externalLink: "http://10.96.0.29:2000/",
    },
  ];

  const flashcardsUteis: Flashcard[] = [
    {
      title: "ATTUS PGE",
      description:
        "Sistema de apoio à gestão de processos jurídicos e execução fiscal",
      image: imgAttusPge,
      externalLink: "https://pgepa.attus.ai/",
    },
    {
      title: "SITE PGE",
      description:
        "Portal institucional da Procuradoria-Geral do Estado do Pará",
      image: imgBrasaoPge,
      externalLink: "https://www.pge.pa.gov.br/",
    },
    {
      title: "ZIMBRA",
      description:
        "Plataforma de e-mail e colaboração corporativa da Procuradoria-Geral do Estado do Pará",
      image: imgZimbra,
      externalLink: "https://mail.pa.gov.br/",
    },
    {
      title: "GOVERNO DIGITAL",
      description: "Sistema de centralização dos sistemas do Governo do Pará",
      image: imgProdepa,
      externalLink: "https://sistemas.pa.gov.br/",
    },
    {
      title: "PJE TJPA",
      description: "Sistema de tramitação de processos judiciais eletrônicos",
      image: imgPje,
      externalLink:
        "https://www.tjpa.jus.br/PortalExterno/institucional/Portal-PJE/942-Apresentacao.xhtml",
    },
    {
      title: "PJE TRT8",
      description: "Sistema eletrônico de processos judiciais do TRT8",
      image: imgTrt8,
      externalLink: "https://www.trt8.jus.br/pje",
    },
    {
      title: "PJE TRF1",
      description: "Sistema eletrônico de processos judiciais do TRF1",
      image: imgTrf1,
      externalLink: "https://www.trf1.jus.br/sjpa/home/",
    },
  ];

  // Componente interno do cartão (reaproveitado para ambas as listas)
  const CardContent = ({ card }: { card: Flashcard }) => (
    <>
      <span className="sr-only">{card.description}</span>

      <div className="pointer-events-none absolute left-1/2 bottom-full z-50 mb-2 w-[calc(100%-1rem)] -translate-x-1/2 rounded-xl bg-slate-900/95 px-3 py-2 text-xs font-medium text-white text-center opacity-0 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:mb-3 group-hover:opacity-100 group-focus-visible:mb-3 group-focus-visible:opacity-100">
        {card.description}
      </div>

      <div className="relative z-10 w-16 h-16 shrink-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-3 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-contain animate-float"
        />
      </div>

      <div className="relative z-10 ml-5 flex-1 overflow-hidden text-left">
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
          {card.title}
        </h3>
      </div>

      <div className="relative z-10 shrink-0 w-10 h-10 rounded-full bg-slate-50/50 flex items-center justify-center text-slate-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-300">
        <ExternalLink className="w-5 h-5" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </>
  );

  // Função para renderizar as grades dinamicamente evitando duplicação de código
  const renderGrid = (cards: Flashcard[], gridClasses: string) => (
    <div className={`grid gap-x-6 gap-y-8 w-full ${gridClasses}`}>
      {cards.map((card, index) => {
        const cardClasses = `group relative glass-card rounded-2xl p-6 flex items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 w-full`;

        return (
          <div
            key={index}
            className="animate-slideIn w-full relative"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {card.externalLink ? (
              <a
                href={card.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClasses}
              >
                <CardContent card={card} />
              </a>
            ) : (
              <Link to="/" className={cardClasses}>
                <CardContent card={card} />
              </Link>
            )}

            {/* Popover Mobile */}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="sm:hidden absolute top-2 right-2 z-20 h-8 w-8 rounded-full bg-white/90 text-slate-600 border border-slate-200 shadow-sm flex items-center justify-center"
                  aria-label={`Ver descrição de ${card.title}`}
                >
                  <CircleHelp className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                sideOffset={8}
                className="sm:hidden w-64 text-sm"
              >
                {card.description}
              </PopoverContent>
            </Popover>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <Helmet title="Home" />
      {/* min-h-screen e pb-24 permitem scroll elegante devido ao volume de cartões */}
      <div className="relative w-full flex flex-col pt-6 px-4 min-h-screen pb-24">
        <div className="max-w-7xl w-full mx-auto flex flex-col h-full">
          {/* Header Section */}
          <div className="text-center mb-12 animate-slideIn shrink-0">
            <h1 className="text-5xl md:text-5xl font-extrabold gradient-text mb-4 animate-scaleIn">
              Sistemas PGE-PA
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed animate-fadeIn">
              Sistemas da Procuradoria-Geral do Estado do Pará
            </p>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 mx-auto rounded-full animate-scaleIn" />
          </div>

          {/* Grid Principal (12 itens -> 4 colunas) */}
          {renderGrid(
            flashcards,
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          )}

          {/* Separador Moderno (Badge Divisor) */}
          <div
            className="w-full mt-10 mb-10 animate-slideIn"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-slate-300" />
              <div className="px-5 py-2.5 rounded-full border border-slate-200/60 bg-white/60 backdrop-blur-md text-slate-600 text-sm font-bold tracking-widest uppercase flex items-center gap-2 shadow-sm">
                <Link2 className="w-5 h-5 text-blue-500" />
                Links Úteis
              </div>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-300 to-slate-300" />
            </div>
          </div>

          {/* Grid Secundário (5 itens -> 5 colunas para caber numa linha só nas telas grandes!) */}
          {renderGrid(
            flashcardsUteis,
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          )}
        </div>

        {/* Footer Flutuante Atualizado */}
        <div className="fixed bottom-8 right-8 z-20">
          <div className="glass rounded-2xl p-4 animate-float shadow-sm border border-white/40">
            <div className="gradient-text font-bold text-sm">
              {flashcards.length + flashcardsUteis.length} Sistemas Disponíveis
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
