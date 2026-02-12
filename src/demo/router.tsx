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
import { RadioButtonPage } from "./pages/RadioButtonPage";
import FileInputPage from "./pages/FileInputPage";
import TabsPage from "./pages/TabsPage";
import SelectPage from "./pages/SelectPage";
import ModalPage from "./pages/ModalPage";
import TypographyPage from "./pages/TypographyPage";
import ColorsPage from "./pages/ColorsPage";
import InputGroupPage from "./pages/form-field/InputGroupPage";
import CheckboxPage from "./pages/form-field/CheckboxPage";
import InputFieldPage from "./pages/form-field/InputFieldPage";
import CounterPage from "./pages/form-field/CounterPage";
import InputFilePage from "./pages/form-field/InputFilePage";

const DocsRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/avatar" element={<AvatarPage />} />
        <Route path="/button" element={<ButtonPage />} />
        <Route path="/card" element={<CardPage />} />
        <Route path="/chip" element={<ChipPage />} />
        <Route path="/file-input" element={<FileInputPage />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/modal" element={<ModalPage />} />
        <Route path="/radio-button" element={<RadioButtonPage />} />
        <Route path="/select" element={<SelectPage />} />
        <Route path="/switch" element={<SwitchPage />} />
        <Route path="/tabs" element={<TabsPage />} />
        <Route path="/typography" element={<TypographyPage />} />
        <Route path="/colors" element={<ColorsPage />} />
        <Route path="/checkbox" element={<CheckboxPage />} />
        <Route path="/input-field" element={<InputFieldPage />} />
        <Route path="/input-group" element={<InputGroupPage />} />
        <Route path="/counter" element={<CounterPage />} />
        <Route path="/input-file" element={<InputFilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default DocsRouter;
