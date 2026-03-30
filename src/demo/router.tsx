import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ButtonPage from './pages/components/ButtonPage';
import InputPage from './pages/InputPage';
import CardPage from './pages/CardPage';
import { NotFoundPage } from './pages/NotFoundPage';
import ChipPage from './pages/ChipPage';
import AvatarPage from './pages/AvatarPage';
import { RadioButtonPage } from './pages/RadioButtonPage';
import TabsPage from './pages/TabsPage';
import ModalPage from './pages/ModalPage';
import TypographyPage from './pages/TypographyPage';
import ColorsPage from './pages/ColorsPage';
import InputGroupPage from './pages/form-field/InputGroupPage';
import CheckboxPage from './pages/form-field/CheckboxPage';
import InputFieldPage from './pages/form-field/InputFieldPage';
import CounterPage from './pages/form-field/CounterPage';
import InputFilePage from './pages/form-field/InputFilePage';
import CalendarPage from './pages/components/CalendarPage';
import DatePickerPage from './pages/form-field/DatePickerPage';
import TablePage from './pages/data-display/TablePage';
import ToastPage from './pages/feedback/ToastPage';
import SelectPage from './pages/form-field/SelectPage';
import { SwitchPage } from './pages/form-field/SwitchPage';
import ButtonGroupPage from './pages/components/ButtonGroupPage';

const DocsRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/avatar" element={<AvatarPage />} />
        <Route path="/button" element={<ButtonPage />} />
        <Route path="/button-group" element={<ButtonGroupPage />} />
        <Route path="/card" element={<CardPage />} />
        <Route path="/chip" element={<ChipPage />} />
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
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/date-picker" element={<DatePickerPage />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="/toast" element={<ToastPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default DocsRouter;
