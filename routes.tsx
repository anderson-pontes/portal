import { createHashRouter } from "react-router-dom";

import { NotFound } from './src/pages/app/404';
import { Home } from './src/pages/app/Home';
import { AppLayout } from './src/pages/layout/app'
import { HomeBancoPareceres } from '@/pages/app/HomeBancoPareceres';
import HomePcta from '@/pages/app/Pcta';



export const Router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> },     
      { path: '/bancodeteses', element: <HomeBancoPareceres /> },     
      { path: '/pcta', element: <HomePcta /> },     
      
          
      
      
    ]
  },
  
  
]);
