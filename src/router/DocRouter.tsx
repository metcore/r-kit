import { Routes, Route } from 'react-router-dom';
import DocsLayout from '../doc/layouts/DocLayout';
import HomePage from '../doc/pages/HomePage';

export default function DocRouter() {
  return (
    <Routes>
      <Route element={<DocsLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}
