import React, { useState } from "react";
import "./Conta.css";

const AccountPage = () => {
  const [password, setPassword] = useState("");
  const user = {
    name: "João Silva",
    email: "joao@email.com",
    CPF: "12345678910",
  };

  const handleChangePassword = () => {
    alert("Senha trocada com sucesso!");
    setPassword(""); // Limpar campo após trocar a senha
  };

  const handleLogout = () => {
    alert("Você foi deslogado!");
  };

  return (
    <div className="account-page">
      <h1>Informações da Conta</h1>
      <div className="user-info">
        <p>
          <strong>Nome:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>CPF</strong> {user.CPF}
        </p>
      </div>
      <div className="actions">
        <h2>Trocar Senha</h2>
        <input
          type="password"
          placeholder="Nova senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleChangePassword}>Alterar</button>
        <button className="logout-button" onClick={handleLogout}>
          Deslogar
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
