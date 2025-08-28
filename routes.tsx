import { createHashRouter, LoaderFunctionArgs, Navigate } from "react-router-dom";
import { NotFound } from './src/pages/app/404';
import { Home } from './src/pages/app/Home';
import { AppLayout } from './src/pages/layout/app';
import { HomeBancoPareceres } from '@/pages/app/HomeBancoPareceres';
import HomePcta from '@/pages/app/Pcta';
import FolderDetailsPage from '@/pages/app/FolderDetailsPage';
import SubfolderDetailsPage from '@/pages/app/SubfolderDetailsPage';
import ManageFolderPage from '@/pages/app/ManageFolderPage';
import CreateItemPage from '@/pages/app/CreateItemPage';
import LoginPage from '@/pages/auth/Sign-in';

// Componente para proteger rotas
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
  if (!token) {
    return <Navigate to="/" replace />; // Redireciona para login se não estiver autenticado
  }
  return children;
}

export const Router = createHashRouter([
  // Login (página pública)
  {
    path: "/",
    element: <LoginPage />,
  },

  // Rotas protegidas
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
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
