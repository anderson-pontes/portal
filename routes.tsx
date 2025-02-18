import { createHashRouter, LoaderFunctionArgs } from "react-router-dom";
import { NotFound } from './src/pages/app/404';
import { Home } from './src/pages/app/Home';
import { AppLayout } from './src/pages/layout/app';
import { HomeBancoPareceres } from '@/pages/app/HomeBancoPareceres';
import HomePcta from '@/pages/app/Pcta';
import FolderDetailsPage  from '@/pages/app/FolderDetailsPage';



export const Router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/bancodeteses', element: <HomeBancoPareceres /> },
      { path: '/pcta', element: <HomePcta /> },
      {
        path: "/folder/:folderId",
        element: <FolderDetailsPage />,
        loader: ({ params }: LoaderFunctionArgs) => {
          const folderId = params.folderId;
          return { folderId }; // Retornando folderId para o componente
        },
      },
    ]
  },
]);
