import "./Conta.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import api from "../../service/api";

interface User {
  name: string;
  email: string;
  cpf: string;
}

const AccountPage = () => {
  const [password, setPassword] = useState("");
  const { logout } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Usuário não encontrado.");
        return;
      }

      const { data } = await api.get(`/users/${userId}`);
      setUser(data);
    } catch (error) {
      alert(
        axios.isAxiosError(error)
          ? error?.response?.data || "Erro ao carregar os dados."
          : "Erro desconhecido."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!password) {
      alert("Por favor, insira uma nova senha.");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Usuário não encontrado.");
        return;
      }

      await api.put(`/users/${userId}`, {
        password,
      });

      alert("Senha trocada com sucesso!");
      setPassword("");
    } catch (error) {
      alert(
        axios.isAxiosError(error)
          ? error?.response?.data || "Erro ao atualizar a senha."
          : "Erro desconhecido."
      );
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir sua conta? Essa ação não poderá ser desfeita."
    );

    if (!confirmDelete) return;

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Usuário não encontrado.");
        return;
      }

      await api.delete(`/users/${userId}`);
      alert("Conta excluída com sucesso!");
      logout();
    } catch (error) {
      alert(
        axios.isAxiosError(error)
          ? error?.response?.data || "Erro ao excluir a conta."
          : "Erro desconhecido."
      );
    }
  };

  if (loading) {
    return (
      <div
        className="loading"
        style={{ textAlign: "center", padding: "40px 0", fontSize: "32px" }}
      >
        Carregando...
      </div>
    );
  }

  return (
    <main>
      <div className="account-page">
        <h1>Informações da Conta</h1>
        {user ? (
          <div className="user-info">
            <p>
              <strong>Nome:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>CPF:</strong> {user.cpf}
            </p>
          </div>
        ) : (
          <p>Usuário não encontrado.</p>
        )}
        <div className="actions">
          <h2>Trocar Senha</h2>
          <input
            type="password"
            placeholder="Nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Nova senha"
          />
          <button
            style={{ marginBottom: "10px" }}
            className="change-password-button"
            onClick={handleChangePassword}
          >
            Alterar
          </button>
          <button className="logout-button" onClick={logout}>
            Deslogar
          </button>
          <button className="delete-account-button" onClick={handleDeleteAccount}>
            Excluir Conta
          </button>
        </div>
      </div>
    </main>
  );
};

export default AccountPage;
