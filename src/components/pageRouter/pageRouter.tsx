import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "../../pages/auth/page";
import DashboardPage from "../../pages/dashboard/page";
import { useUser } from "../../context/AuthContext";

// Seria bom ter um componente de loading para uma melhor UX
const LoadingScreen = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Carregando...</h2>
    </div>
);

export default function PageRouter() {
    const { isAuthenticated, isLoading } = useUser();

    if (isLoading) {
        return <LoadingScreen />;
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={isAuthenticated ? <Navigate to='/dashboard' replace /> : <Navigate to='/auth' replace />}
                />

                <Route
                    path="/auth"
                    element={!isAuthenticated ? <AuthPage /> : <Navigate to='/dashboard' replace />}
                />


                <Route
                    path="/dashboard"
                    element={isAuthenticated ? <DashboardPage /> : <Navigate to='/auth' replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}