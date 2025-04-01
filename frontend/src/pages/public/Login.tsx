import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUser, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./Login.css";

const schema = z.object({
  usuario: z.string().min(3, "O usuário deve ter pelo menos 3 caracteres"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (data: FormData) => {
    console.log("Login realizado com sucesso:", data);
  };

  return (
    <div className="center">
      <div className="wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>

          <div className="input-box">
            <input type="text" placeholder="Usuário" {...register("usuario")} />
            <FaUser className="icon" />
            {errors.usuario && <p className="error">{errors.usuario.message}</p>}
          </div>

          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              {...register("senha")}
            />
            <FaLock className="icon" />
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
            {errors.senha && <p className="error">{errors.senha.message}</p>}
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" />Lembrar Senha
            </label>
            <a href="/recuperar-senha">Esqueceu a Senha?</a>
          </div>

          <button type="submit">Login</button>

          <div className="register-link">
            <p>
              Você não tem uma conta? <a href="CriarConta">Criar Conta</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
