import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../pages/App/App";
import Shop from "../pages/Shop/Shop";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Shop />,
      },
      { path: "*", element: <Shop /> },
    ],
  },
];

const config = {
  //removes future flag warnings in console
  future: {
    v7_startTransition: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  },
};

const router = createBrowserRouter(routes, config);

export default router;
