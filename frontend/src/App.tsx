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
import PagCar from "./pages/public/PagCar";
import Polpriv from "./pages/public/Polpriv";
import Term from "./pages/public/Term";
import CadastroCar from "./pages/public/CadastroCar";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route>

          <Route element={<LayoutHome><Outlet /></LayoutHome>}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/carlist" element={<Carlist />} />
          </Route>

          <Route element={<PrivateRoute><LayoutHome><Outlet /></LayoutHome></PrivateRoute>}>
            <Route path="/cadastrocar" element={<CadastroCar />} />
          </Route>


         
          <Route element={<LayoutLogin backgroundImage={BackgroudLogin}><Outlet /></LayoutLogin>}>
            <Route path="/login" element={<Login />} />
            <Route path="/CriarConta" element={<CriarConta />} />
            <Route path="/pagcar" element={<PagCar />} />
            <Route path="/recuperar-senha" element={<RecuperarSenha />} />
            <Route path="/conta" element={<Conta />} />
            <Route path="/polpriv" element={<Polpriv />} />
            <Route path="/term" element={<Term />} />
          </Route>

        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
