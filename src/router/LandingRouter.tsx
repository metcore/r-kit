import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../landing/pages/HomePage';

export default function LandingRouter() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
    </Routes>
  );
}
