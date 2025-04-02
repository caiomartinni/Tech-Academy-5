import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import CriarConta from "./pages/public/CriarConta";
import LayoutLogin from "./components/layout/LayoutLogin";
import BackgroudLogin from "./assets/backgrod/backgroud.webp";
import LayoutHome from "./components/layout/layouthome";
import RecuperarSenha from "./pages/public/RecuperarSenha";
import Carlist from "./pages/public/Carlist";
import Conta from "./pages/public/Conta";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            element={
              <LayoutHome>
                <Outlet />
              </LayoutHome>
            }
          >
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/carlist" element={<Carlist />} />
          <Route
            element={
              <LayoutLogin backgroundImage={BackgroudLogin}>
                <Outlet />
              </LayoutLogin>
            }
          >
            <Route path="/login" element={<Login />} />
            <Route path="/recuperar-senha" element={<RecuperarSenha />} />
            <Route path="/CriarConta" element={<CriarConta />} />
            <Route path="/conta" element={<Conta />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
