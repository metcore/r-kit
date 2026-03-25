import { ToastProvider } from './components/toast';
import DocsRouter from './demo/router';

function App() {
  return (
    <ToastProvider>
      <DocsRouter />
    </ToastProvider>
  );
}

export default App;
