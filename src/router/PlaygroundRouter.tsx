import { Routes, Route } from 'react-router-dom';
import HomePage from '../playground/pages/HomePage';
import ButtonPage from '../playground/pages/components/ButtonPage';
import ButtonGroupPage from '../playground/pages/components/ButtonGroupPage';
import CardPage from '../playground/pages/CardPage';
import ChipPage from '../playground/pages/ChipPage';
import InputPage from '../playground/pages/InputPage';
import ModalPage from '../playground/pages/ModalPage';
import RadioButtonPage from '../playground/pages/RadioButtonPage';
import SelectPage from '../playground/pages/form-field/SelectPage';
import { SwitchPage } from '../playground/pages/form-field/SwitchPage';
import TabsPage from '../playground/pages/TabsPage';
import TypographyPage from '../playground/pages/TypographyPage';
import ColorsPage from '../playground/pages/ColorsPage';
import CheckboxPage from '../playground/pages/form-field/CheckboxPage';
import InputFieldPage from '../playground/pages/form-field/InputFieldPage';
import InputGroupPage from '../playground/pages/form-field/InputGroupPage';
import CounterPage from '../playground/pages/form-field/CounterPage';
import InputFilePage from '../playground/pages/form-field/InputFilePage';
import CalendarPage from '../playground/pages/components/CalendarPage';
import DatePickerPage from '../playground/pages/form-field/DatePickerPage';
import TablePage from '../playground/pages/data-display/TablePage';
import ToastPage from '../playground/pages/feedback/ToastPage';
import TextEditorPage from '../playground/pages/form-field/TextEditorPage';
import ProgressBarPage from '../playground/pages/components/ProgressBarPage';
import TimelinePage from '../playground/pages/components/TimelinePage';
import IconPage from '../playground/pages/components/IconPage';
import { NotFoundPage } from '../playground/pages/NotFoundPage';
import SheetPage from '../playground/pages/SheetPage';
import BreadcrumbPage from '../playground/pages/BreadCrumPage';
import PaginationPage from '../playground/pages/PaginationPage';
import AvatarPage from '../playground/pages/AvatarPage';
import PlaygroundLayout from '../playground/layouts/PlaygroundLayout';
import SidebarPage from '../playground/pages/SidebarPage';
import AsyncSelectPage from '../playground/pages/form-field/AsyncSelectPage';

export default function PlaygroundRouter() {
  return (
    <Routes>
      <Route element={<PlaygroundLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/avatar" element={<AvatarPage />} />
        <Route path="/button" element={<ButtonPage />} />
        <Route path="/button-group" element={<ButtonGroupPage />} />
        <Route path="/breadcrumb" element={<BreadcrumbPage />} />
        <Route path="/pagination" element={<PaginationPage />} />
        <Route path="/card" element={<CardPage />} />
        <Route path="/chip" element={<ChipPage />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/modal" element={<ModalPage />} />
        <Route path="/radio-button" element={<RadioButtonPage />} />
        <Route path="/select" element={<SelectPage />} />
        <Route path="/async-select" element={<AsyncSelectPage />} />
        <Route path="/switch" element={<SwitchPage />} />
        <Route path="/tabs" element={<TabsPage />} />
        <Route path="/sheet" element={<SheetPage />} />
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
        <Route path="/text-editor" element={<TextEditorPage />} />
        <Route path="/progress-bar" element={<ProgressBarPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/icons" element={<IconPage />} />
        <Route path="/sidebar" element={<SidebarPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
