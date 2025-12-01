import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ButtonPage from "./pages/ButtonPage";
import InputPage from "./pages/InputPage";
import CardPage from "./pages/CardPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import ChipPage from "./pages/ChipPage";
import AvatarPage from "./pages/AvatarPage";
import { SwitchPage } from "./pages/SwitchPage";

const DocsRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/button" element={<ButtonPage />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/chip" element={<ChipPage />} />
        <Route path="/card" element={<CardPage />} />
        <Route path="/avatar" element={<AvatarPage />} />
        <Route path="/switch" element={<SwitchPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default DocsRouter;
