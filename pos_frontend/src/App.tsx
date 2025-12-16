import "./index.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomePage from "./Pages/Home";
import LoginPage from "./Pages/Login";
import CategoryPage from "./Pages/Category";
import ProductPage from "./Pages/Product";
import SalePage from "./Pages/Sales";
import ProfilePage from "./Pages/Profile";
import PosPage from "./Pages/Pos";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/sales" element={<SalePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/pos" element={<PosPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
