import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./UI/AppLayout";
import Auth from "./pages/Auth";
import Forecast from "./pages/Forecast";

import { ThemeProvider } from "styled-components";
import { theme } from "./styles/Theme";
import { GlobalStyles } from "./styles/Global";

import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        path: "/",
        element: <Auth />,
      },
      {
        path: "/forecast",
        element: <Forecast />,
      },
    ],
  },
]);

const toastOptions = {
  className: "",
  success: {
    style: {
      background: "#ffebaf",
      border: "1px solid #713200",
      padding: "16px",
      color: "#713200",
    },
    iconTheme: {
      primary: "##474000",
      secondary: "#474000",
    },
  },
};

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router} />
        <Toaster position="top-center" toastOptions={toastOptions} />
      </ThemeProvider>
    </>
  );
}

export default App;
