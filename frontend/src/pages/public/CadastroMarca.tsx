import React, { useState } from "react";
import "./CadastroMarca.css";
import axios from "axios";

const CadastroMarca: React.FC = () => {
  const [marca, setMarca] = useState("");
  const [mensagem, setMensagem] = useState(""); // Exibir mensagens de sucesso ou erro

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMensagem("");

    // Obtém o token armazenado após login
    const token = localStorage.getItem("token"); // Certifique-se de que o token está salvo corretamente

    try {
      const response = await axios.post(
        "http://localhost:3000/brands",
        {
          name: marca, // ✅ Enviando o nome corretamente
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Enviando o token JWT no header
          },
        }
      );

      if (response.status === 201) {
        setMensagem("Marca cadastrada com sucesso! 🚀");
        setMarca(""); // Limpa o campo após cadastro
      }
    } catch (error) {
      setMensagem(
        "Erro ao cadastrar marca. Verifique os dados e tente novamente."
      );
      console.error("Erro:", error);
    }
  };

  return (
    <div className="cartalogo-container">
      <h1>Cadastro de Marcas</h1>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="marca">Nome da Marca:</label>
          <input
            id="marca"
            type="text"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            placeholder="Insira o nome da marca"
            required
          />
        </div>
        <button type="submit">Cadastrar Marca</button>
      </form>
    </div>
  );
};

export default CadastroMarca;
