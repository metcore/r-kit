import { ToastProvider } from './components/toast';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <ToastProvider>
      <AppRouter />
    </ToastProvider>
  );
}

export default App;
