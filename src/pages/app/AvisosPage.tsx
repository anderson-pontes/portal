import { Helmet } from "react-helmet-async";

const CANVA_EMBED_URL =
  "https://www.canva.com/design/DAHBIkGL8ng/Y3v5haVp90chM9Byye-jKw/watch?embed&autoplay=1&loop=1";
const CANVA_LINK_URL =
  "https://www.canva.com/design/DAHBIkGL8ng/Y3v5haVp90chM9Byye-jKw/watch?utm_content=DAHBIkGL8ng&utm_campaign=designshare&utm_medium=embeds&utm_source=link";

export default function AvisosPage() {
  return (
    <>
      <Helmet>
        <title>Avisos</title>
      </Helmet>
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <div
          className="w-full overflow-hidden rounded-lg shadow-lg"
          style={{
            paddingTop: "100%",
            position: "relative",
            boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
          }}
        >
          <iframe
            loading="lazy"
            src={CANVA_EMBED_URL}
            title="Avisos"
            allowFullScreen
            allow="fullscreen; autoplay"
            className="absolute top-0 left-0 w-full h-full border-0 p-0 m-0"
          />
        </div>
        <p className="mt-4 text-center text-sm text-slate-500">
          <a
            href={CANVA_LINK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 underline"
          >
            Cópia de Teste de vídeo
          </a>{" "}
          de Anderson Pinheiro
        </p>
      </div>
    </>
  );
}
