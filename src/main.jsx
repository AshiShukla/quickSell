/*
 * Author: Ashish SHukla
 * Description: This code is part of the online assessment provided by Quick Sell.
 * Year: 2024
 * Email: ashishgkp22@gmail.com
 */
import { StrictMode, React } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:group" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
