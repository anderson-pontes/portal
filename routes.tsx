import { createHashRouter, LoaderFunctionArgs } from "react-router-dom";
import { NotFound } from './src/pages/app/404';
import { Home } from './src/pages/app/Home';
import { AppLayout } from './src/pages/layout/app';
import { HomeBancoPareceres } from './src/pages/app/HomeBancoPareceres';
import HomePcta from './src/pages/app/Pcta';
import FolderDetailsPage from './src/pages/app/FolderDetailsPage';
import SubfolderDetailsPage from './src/pages/app/SubfolderDetailsPage';
import ManageFolderPage from './src/pages/app/ManageFolderPage';
import CreateItemPage from './src/pages/app/CreateItemPage';

export const Router = createHashRouter([
  // Todas as rotas são agora públicas
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <Home /> }, // Home page na rota raiz
      { path: "bancodeteses", element: <HomeBancoPareceres /> },
      { path: "pcta", element: <HomePcta /> },
      { path: "home", element: <Home /> },
      {
        path: "folder/:folderId",
        element: <FolderDetailsPage />,
        loader: ({ params }: LoaderFunctionArgs) => ({ folderId: params.folderId }),
      },
      {
        path: "folder/:folderId/:subfolderId",
        element: <SubfolderDetailsPage />,
        loader: ({ params }: LoaderFunctionArgs) => ({
          folderId: params.folderId,
          subfolderId: params.subfolderId,
        }),
      },
      {
        path: "folder/:folderId/:subfolderId/:subsubfolderId",
        element: <SubfolderDetailsPage />,
        loader: ({ params }: LoaderFunctionArgs) => ({
          folderId: params.folderId,
          subfolderId: params.subfolderId,
          subsubfolderId: params.subsubfolderId,
        }),
      },
      {
        path: "folder/:folderId/manage",
        element: <ManageFolderPage />,
        loader: ({ params }: LoaderFunctionArgs) => ({ folderId: params.folderId }),
      },
      {
        path: "folder/:folderId/create",
        element: <CreateItemPage />,
        loader: ({ params }: LoaderFunctionArgs) => ({ folderId: params.folderId }),
      },
    ],
  },
]);
