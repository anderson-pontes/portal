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
import imgJurisPge from "@/assets/juris-pge.png";
import imgNcaDigital from "@/assets/nca-digital.png";
import imgSistemasLegados from "@/assets/sistemas-legados.png";
import { Link } from "react-router-dom";
import { ExternalLink } from 'lucide-react';

export function Home() {
    const flashcards = [
        { title: "SIGESCON", description: "Sistema de Gestão de Contratos", image: imgSigescon, externalLink: "http://sigescon.pge.pa.gov.br/" },
        { title: "SIDA", description: "Sistema de Inteligência da Procuradoria da Dívida Ativa", image: imgSida, externalLink: "https://sida.pge.pa.gov.br" },
        { title: "LEXPGE", description: "Base de Atos Normativos da Procuradoria-Geral do Estado do Pará", image: imgLexPge, externalLink: "https://lex.pge.pa.gov.br/" },
        { title: "BUSCA DOE", description: "Sistema de Busca Avançado de Diários Oficiais do Estado do Pará", image: imgBuscaDoe, externalLink: "http://buscadoe.pge.pa.gov.br/" },
        { title: "SUPORTE DTI", description: "Sistema de Suporte da Diretoria de Tecnologia da Informação", image: imgSuporteDtigd, externalLink: "http://suportedti.pge.pa.gov.br/" },
        { title: "CLOUD PGE", description: "Sistema de Armazenamento de Arquivos da Procuradoria-Geral do Estado do Pará", image: imgNuvem, externalLink: "https://cloud.pge.pa.gov.br/" },
        { title: "GDAP", description: "Gratificação de Desempenho de Apoio à Procuradoria", image: imgGdap, externalLink: "http://10.96.0.51/" },
        { title: "e-CONSULTA", description: "Sistema de Consulta de Processos do e-PGE", image: imgBancoPareceres, externalLink: "http://10.96.0.54:4000" },
        { title: "EAD ESAP", description: "Plataforma de Ensino a Distância da ESAP", image: imgEadEsap, externalLink: "https://eadesap.pge.pa.gov.br" },
        { title: "JURIS PGE-PA", description: "Base Unificada de Jurisprudências", image: imgJurisPge, externalLink: "https://juris.pge.pa.gov.br" },
        { title: "NCA Digital", description: "Plataforma para gerenciamento de solicitações de Análise de Prescrição e Carta de Anuência", image: imgNcaDigital, externalLink: "https://nca.pge.pa.gov.br" },
        { title: "SISTEMAS LEGADOS", description: "Plataforma Integrada de Sistemas Legados", image: imgSistemasLegados, externalLink: "http://10.96.0.29:2000/" }
    ];

    const CardContent = ({ card }) => (
        <>
            {/* Ícone e Container aumentados para w-16 h-16 */}
            <div className="relative z-10 w-16 h-16 shrink-0 bg-gradient-to-br from-blue-50/80 to-purple-50/80 rounded-xl p-3 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300 group-hover:rotate-3">
                <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-contain animate-float shadow-sm "
                />
            </div>
            
            {/* Textos com fontes levemente maiores */}
            <div className="relative z-10 ml-5 flex-1 overflow-hidden text-left">
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {card.title}
                </h3>
            </div>

            {/* Ícone de Seta de Ação */}
            <div className="relative z-10 shrink-0 w-10 h-10 rounded-full bg-slate-50/50 flex items-center justify-center text-slate-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-300">
                <ExternalLink className="w-5 h-5" />
            </div>

            {/* Gradiente animado original restaurado! */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </>
    );

    return (
        <>
            <Helmet title="Home" />
            {/* Mantido o pt-10 e h-[calc] para travar o scroll, mas permitindo que o flex distribua o espaço */}
            <div className="relative w-full flex flex-col pt-10 px-4 overflow-hidden">
                
                <div className="max-w-7xl w-full mx-auto flex flex-col h-full">
                    
                    {/* Header Section */}
                    <div className="text-center mb-10 animate-slideIn shrink-0">
                        <h1 className="text-5xl md:text-6xl font-extrabold gradient-text mb-4 animate-scaleIn">
                            Sistemas PGE-PA
                        </h1>
                        <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed animate-fadeIn">
                            Sistemas da Procuradoria-Geral do Estado do Pará
                        </p>
                        <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 mx-auto rounded-full animate-scaleIn" />
                    </div>

                    {/* Cards Grid - Agora com gap-6 (horizontal) e gap-8 (vertical) para expandir e preencher o vazio */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8 w-full">
                        {flashcards.map((card, index) => {
                            {/* Deixei apenas a sua classe glass-card e os arredondamentos para limpar a cor de fundo */}
                            const cardClasses = `group relative glass-card rounded-2xl p-6 flex items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 w-full`;
                            
                            return (
                                <div 
                                    key={index} 
                                    className="animate-slideIn w-full"
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
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                {/* Footer Flutuante (Contador) */}
                <div className="fixed bottom-8 right-8 z-20">
                    <div className="glass rounded-2xl p-4 animate-float shadow-sm">
                        <div className="gradient-text font-bold text-sm">
                            {flashcards.length} Sistemas
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}