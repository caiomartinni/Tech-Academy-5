import "./CriarConta.css"
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";



function CriarConta() {
    return(
        <div className="center">
        <div className="wrapper">
            <form action="">
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder="Nome de Usuario" required />
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="text" placeholder="Email" required />
                    <MdEmail className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Senha" required />
                    <FaLock className="icon"/>
                </div>
                <button type="submit">Criar Conta</button>
                <div className="register-link"></div>
                        <p>Voce possui conta? <a href="#">Login</a> </p>
            </form>
        </div>
        </div>
    )


}

export default CriarConta