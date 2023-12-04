import { Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar'
import Login from './pages/Login'
import LoginPage from "./pages/Navlog"
import {useAuth } from './context/AuthContext';
import { ProtectedRoute } from "./components/ProtectedRoute"

function App() {
  const { user } = useAuth();

  return (
    <>
      {user && <Navbar/>}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/action" element={<Login />} />
        <Route path="/*" element={<ProtectedRoute />} />
      </Routes>
    </>
  )
}

export default App;
