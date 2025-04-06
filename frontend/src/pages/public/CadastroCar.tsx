import React, { useState } from "react";
import "./CadastroCar.css";

const CadastroCar: React.FC = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`Marca: ${brand}, Modelo: ${model}`);
    // Aqui você pode implementar lógica para enviar os dados a um backend
    setBrand("");
    setModel("");
  };

// ======================================================================================



// ======================================================================================


  return (
    <div className="cartalogo-container">
      <h1>Cadastro de Marcas e Veículos</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="brand">Marca:</label>
          <input
            id="brand"
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Insira a marca"
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Modelo:</label>
          <input
            id="model"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Insira o modelo"
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Descriçao:</label>
          <input
            id="model"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Insira a descriçao"
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Especificaçoes:</label>
          <input
            id="model"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Insira as especificaçoes"
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Preço:</label>
          <input
            id="model"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Insira o preço"
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Tipo:</label>
          <input
            id="model"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Insira o tipo do veiculo"
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Ano:</label>
          <input
            id="model"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Insira o ano do veiculo"
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroCar;
