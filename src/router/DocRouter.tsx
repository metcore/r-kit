import { Routes, Route } from 'react-router-dom';
import DocLayout from '../doc/layouts/DocLayout';
import DocPage from '../doc/pages/DocPage';
import NotFoundPage from '../doc/pages/NotFoundPage';

export default function DocRouter() {
  return (
    <Routes>
      <Route element={<DocLayout />}>
        <Route index element={<DocPage />} />
        <Route path=":slug" element={<DocPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
