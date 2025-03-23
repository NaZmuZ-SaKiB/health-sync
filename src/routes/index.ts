import Layout from "@/routes/global/Layout";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
  },
]);

export default router;
