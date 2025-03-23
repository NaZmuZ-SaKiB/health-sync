import Layout from "@/routes/global/Layout";
import { createBrowserRouter } from "react-router";
import Home from "./global/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: Home,
      },
    ],
  },
]);

export default router;
