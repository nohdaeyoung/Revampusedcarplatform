import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { CarList } from "./pages/CarList";
import { CarDetail } from "./pages/CarDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "cars", Component: CarList },
      { path: "cars/:id", Component: CarDetail },
    ],
  },
]);
