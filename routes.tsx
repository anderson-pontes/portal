import { createHashRouter, LoaderFunctionArgs } from "react-router-dom";
import { NotFound } from './src/pages/app/404';
import { Home } from './src/pages/app/Home';
import { AppLayout } from './src/pages/layout/app';
import { HomeBancoPareceres } from '@/pages/app/HomeBancoPareceres';
import HomePcta from '@/pages/app/Pcta';
import FolderDetailsPage from '@/pages/app/FolderDetailsPage';
import SubfolderDetailsPage from '@/pages/app/SubfolderDetailsPage';
import ManageFolderPage from '@/pages/app/ManageFolderPage'; // Importe a página de gerenciamento

export const Router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/bancodeteses', element: <HomeBancoPareceres /> },
      { path: '/pcta', element: <HomePcta /> },
      
      // Rota para visualizar pastas (FolderDetailsPage)
      {
        path: '/folder/:folderId',
        element: <FolderDetailsPage />,
        loader: ({ params }: LoaderFunctionArgs) => {
          const folderId = params.folderId;
          return { folderId }; // Retornando folderId para o componente
        },
      },

      // Rota para visualizar subpastas (SubfolderDetailsPage)
      {
        path: '/folder/:folderId/:subfolderId',
        element: <SubfolderDetailsPage />,
        loader: ({ params }: LoaderFunctionArgs) => {
          const { folderId, subfolderId } = params;
          return { folderId, subfolderId }; // Retornando folderId e subfolderId para o componente
        },
      },

      // Rota para visualizar subpastas aninhadas (SubfolderDetailsPage)
      {
        path: '/folder/:folderId/:subfolderId/:subsubfolderId',
        element: <SubfolderDetailsPage />,
        loader: ({ params }: LoaderFunctionArgs) => {
          const { folderId, subfolderId, subsubfolderId } = params;
          return { folderId, subfolderId, subsubfolderId }; // Retornando folderId, subfolderId e subsubfolderId para o componente
        },
      },

      // Rota para o gerenciamento de pastas (ManageFolderPage)
      {
        path: '/folder/:folderId/manage',
        element: <ManageFolderPage />,
        loader: ({ params }: LoaderFunctionArgs) => {
          const folderId = params.folderId;
          return { folderId }; // Retornando folderId para o componente de gerenciamento
        },
      },
    ],
  },
]);