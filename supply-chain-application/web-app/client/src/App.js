import { useContext } from "react";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { AuthContext } from "./context/authContext/AuthContext";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import MainLayout from "./layouts/MainLayout";
import Product from "./pages/Products/Product";
import Raws from "./pages/Raws/Raws";
import Users from "./pages/Users/Users";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route
          path="*"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
        />
        {user && (
          <>
            <Route path="" element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Product />} />
              <Route path="/raws" element={<Raws />} />
              <Route path="/users" element={<Users />} />
              <Route path="/" element={<Dashboard />} />
            </Route>
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
