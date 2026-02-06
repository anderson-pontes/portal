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
import { Link } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

export function Home() {
    const flashcards = [
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
            description: "Base de Atos Normativos da Procuradoria-Geral do Estado do Pará",
            image: imgLexPge,
            externalLink: "https://lex.pge.pa.gov.br/",
        },
        {
            title: "BUSCA DOE",
            description: "Sistema de Busca Avançado de Diários Oficiais do Estado do Pará",
            image: imgBuscaDoe,
            externalLink: "http://buscadoe.pge.pa.gov.br/",
        },
        {
            title: "SUPORTE DTI",
            description: "Sistema de Suporte da Diretoria de Tecnologia da Informação",
            image: imgSuporteDtigd,
            externalLink: "http://suportedti.pge.pa.gov.br/",
        },
        {
            title: "CLOUD PGE",
            description: "Sistema de Armazenamento de Arquivos da Procuradoria-Geral do Estado do Pará",
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
        
    ];

    return (
        <>
            <Helmet title="Home" />
            <div className="min-h-screen relative">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16 animate-slideIn">
                        <h1 className="text-5xl md:text-6xl font-extrabold gradient-text mb-6 animate-scaleIn">
                            Sistemas PGE-PA
                        </h1>
                        <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed animate-fadeIn">
                            Sistemas da Procuradoria-Geral do Estado do Pará
                        </p>
                        <div className="mt-8 w-24 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 mx-auto rounded-full animate-scaleIn" />
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {flashcards.map((card, index) => (
                            <div
                                key={index}
                                className="group relative glass-card rounded-3xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 overflow-hidden animate-slideIn hover:scale-105"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Gradient Border Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                {/* Card Content */}
                                <div className="relative p-8 flex flex-col items-center text-center h-full">
                                    <div className="w-20 h-20 mb-6 p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                                        <img
                                            src={card.image}
                                            alt={card.title}
                                            className="w-full h-full object-contain animate-float"
                                        />
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:gradient-text transition-all duration-300">
                                        {card.title}
                                    </h3>
                                    
                                    <p className="text-sm text-slate-600 mb-8 flex-grow leading-relaxed">
                                        {card.description}
                                    </p>

                                    {/* Enhanced Action Button */}
                                    {card.externalLink ? (
                                        <a
                                            href={card.externalLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full"
                                        >
                                            <Button className="relative btn-gradient btn-glow shimmer-effect w-full text-white border-0 rounded-2xl py-3 px-6 font-bold text-sm transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25 group-hover:scale-105 overflow-hidden">
                                                <Eye className="h-4 w-4 mr-2 relative z-10" />
                                                <span className="relative z-10">Acessar Sistema</span>
                                            </Button>
                                        </a>
                                    ) : (
                                        <Link to="/" className="w-full">
                                            <Button className="relative btn-gradient btn-glow shimmer-effect w-full text-white border-0 rounded-2xl py-3 px-6 font-bold text-sm transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25 group-hover:scale-105 overflow-hidden">
                                                <Eye className="h-4 w-4 mr-2 relative z-10" />
                                                <span className="relative z-10">Acessar Sistema</span>
                                            </Button>
                                        </Link>
                                    )}
                                </div>

                                {/* Animated Background Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Floating Action Elements */}
                <div className="fixed bottom-8 right-8 z-20">
                    <div className="glass rounded-2xl p-4 animate-float">
                        <div className="gradient-text font-bold text-sm">
                            {flashcards.length} Sistemas
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
