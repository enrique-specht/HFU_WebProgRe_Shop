import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../pages/App/App";
import Shop from "../pages/Shop/Shop";
import Article from "../pages/Article/Article";
import Account from "../pages/Account/Account";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Shop />,
      },
      {
        path: "/article/:articleId",
        element: <Article />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
];

const config = {
  //removes future flag warnings in console
  //https://github.com/remix-run/react-router/issues/12245
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
