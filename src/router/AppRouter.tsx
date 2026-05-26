import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingRouter from './LandingRouter';
import PlaygroundRouter from './PlaygroundRouter';
import { TooltipProvider } from '../clients';
import DocRouter from './DocRouter';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route path="/*" element={<LandingRouter />} />
          <Route path="/docs/*" element={<DocRouter />} />
          <Route path="/playground/*" element={<PlaygroundRouter />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  );
}
