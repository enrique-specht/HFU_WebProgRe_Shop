import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "./index.scss";
import store from "./store/store.ts";
import router from "./router/router.tsx";

createRoot(document.getElementById("root")!).render(
  <PrimeReactProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </PrimeReactProvider>
);
