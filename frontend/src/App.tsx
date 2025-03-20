
import { BrowserRouter, Routes, Route,  } from 'react-router-dom'
import Header from "./components/ui/Header"
import Home from './pages/public/home'
import Login from './pages/public/Login'
function App() {


  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App