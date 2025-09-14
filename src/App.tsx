import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/auth/page";
import './App.css'
import DashboardPage from "./pages/dashboard/page";
import { AppProvider } from "./context/appContext";

function App() {
  return (
    <AppProvider>
      <div className="flex min-h-screen w-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to='/auth' replace />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </BrowserRouter>
      </div >
    </AppProvider>
  )
}

export default App