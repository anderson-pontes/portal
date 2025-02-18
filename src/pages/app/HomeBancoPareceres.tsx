import { Helmet } from "react-helmet-async";
import imgPCTA from "@/assets/pcta.png";
import imgPcon from "@/assets/pcon.png";
import imgPdm from "@/assets/pdm.png";
import imgPDA from "@/assets/pda.png";
import { Link } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';


export function HomeBancoPareceres() {
    const flashcards = [
        {
            title: "PCTA",
            description:
                "Procuradoria Cível Trabalhista e Administrativa",
            image: imgPCTA,
            route: "/pcta",
        },

        {
            title: "PDM",
            description: "Procuradoria de Demandas de Massa",
            image: imgPdm,
            route: "/camarasemfoco",
        },
        {
            title: "PDA",
            description:
                "Procuradoria da Dívida Ativa",
            image: imgPDA,
            route: "/panoramamunicipal"
        },

        {
            title: "PCON",
            description: "Procuradoria Consultiva",
            image: imgPcon,
            route: "/saneamento",
        },     
        


    ];

    return (
        <>
            <Helmet title="Home" />
            <div className="p-6 min-h-screen">



                <h1 className="text-3xl text-blue-800/80 font-bold mb-8 text-center">
                    Bem-vindo ao Banco de Dados de Pareceres da PGE-PA!
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
                                        className="w-16 h-16 mb-4"
                                    />
                                    <h2 className="text-lg font-semibold text-slate-800 mb-2">
                                        {card.title}
                                    </h2>
                                    <p className="text-sm text-slate-600">{card.description}</p>
                                </div>

                                {/* Verso do Card */}
                                <div className="flex flex-col gap-4 absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl items-center justify-center text-center rotate-y-180 backface-hidden p-6 text-white">
                                    <h1 className="text-lg font-semibold">{card.title}</h1>
                                    <Link
                                        to={card.route || "/"}
                                        className="text-lg font-semibold underline hover:text-blue-300"

                                    >
                                        <Button variant="secondary" className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:text-slate-300'>
                                        <Eye className="h-5 w-5" />
                                            Acessar Arquivos
                                        </Button>


                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
