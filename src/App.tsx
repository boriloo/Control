import './App.css'
import { AppProvider } from "./context/AppContext";
import { WindowProvider } from "./context/WindowContext";
import { AuthProvider } from "./context/AuthContext";
import PageRouter from "./components/pageRouter/pageRouter";
import { RootProvider } from './context/RootContext';

function App() {
  return (
    <RootProvider>

      <WindowProvider>
        <AppProvider>
          <AuthProvider>
            <div className="flex min-h-screen w-full">
              <PageRouter />
            </div >
          </AuthProvider>
        </AppProvider>
      </WindowProvider>
    </RootProvider >
  )
}

export default App