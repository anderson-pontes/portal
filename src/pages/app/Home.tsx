import { Helmet } from "react-helmet-async";
import imgBancoPareceres from "@/assets/armazenamento-de-banco-de-dados.png";
import imgSida from "@/assets/logosida.png";
import imgLexPge from "@/assets/pcon.png";
import imgBuscaDoe from "@/assets/busca.png";
import imgSuporteDtigd from "@/assets/suporte.png";
import imgNuvem from "@/assets/nuvem.png";
import imgGdap from "@/assets/gdap.png";
import { Link } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

export function Home() {
    const flashcards = [
        {
            title: "e-CONSULTA",
            description: "Sistema de Consulta de Processos do e-PGE",
            image: imgBancoPareceres,
            externalLink: "http://10.96.0.54:4000",
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
            title: "NUVEM PGE",
            description: "Sistema de Armazenamento de Arquivos da Procuradoria-Geral do Estado do Pará",
            image: imgNuvem,
            externalLink: "/nuvem/",
        },
        {
            title: "GDAP",
            description: "Gratificação de Desempenho de Apoio à Procuradoria",
            image: imgGdap,
            externalLink: "http://10.96.0.26:8080/gdap/",
        },
    ];

    return (
        <>
            <Helmet title="Home" />
            <div className="p-6 min-h-screen">
                <h1 className="text-3xl text-blue-800/80 font-bold mb-8 text-center">
                    Sistemas da Procuradoria-Geral do Estado do Pará
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {flashcards.map((card, index) => (
                        <div
                            key={index}
                            className="group perspective-1000 relative w-full h-64 rounded-3xl shadow-md overflow-hidden"
                        >
                            {/* Container 3D */}
                            <div className="relative w-full h-full transform-style-3d transition-transform duration-700 ease-in-out group-hover:rotate-y-180">
                                {/* Frente do Card */}
                                <div className="absolute inset-0 bg-white rounded-3xl flex flex-col items-center justify-center text-center shadow-lg backface-hidden p-6">
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="w-20 h-20 mb-4"
                                    />
                                    <h2 className="text-lg font-semibold text-slate-800 mb-2">
                                        {card.title}
                                    </h2>
                                    <p className="text-sm text-slate-600">{card.description}</p>
                                </div>

                                {/* Verso do Card */}
                                <div className="flex flex-col gap-4 absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl items-center justify-center text-center rotate-y-180 backface-hidden p-6 text-white">
                                    <h1 className="text-lg font-semibold">{card.title}</h1>

                                    {card.externalLink ? (
                                        <a
                                            href={card.externalLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-lg font-semibold underline hover:text-blue-300"
                                        >
                                            <Button variant="secondary" className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:text-slate-300'>
                                                <Eye className="h-5 w-5" />
                                                Acessar Sistema
                                            </Button>
                                        </a>
                                    ) : (
                                        <Link to="/app">
                                            <Button variant="secondary" className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:text-slate-300'>
                                                <Eye className="h-5 w-5" />
                                                Acessar Sistema
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
