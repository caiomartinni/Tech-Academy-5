import React, { useState, useEffect } from "react";
import "./CadastroCar.css";
import axios from "axios";

const CadastroCar: React.FC = () => {
  const [marcas, setMarcas] = useState<{ id: number; name: string }[]>([]);
  const [brandId, setBrandId] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [specs, setSpecs] = useState("");
  const [averagePrice, setAveragePrice] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [mensagem, setMensagem] = useState("");

  // ✅ Buscar todas as marcas
  useEffect(() => {
    axios
      .get("http://localhost:3000/brands")
      .then((response) => {
        console.log("Marcas carregadas:", response.data);
        setMarcas(response.data);
      })
      .catch((error) => console.error("Erro ao buscar marcas:", error));
  }, []);

  // ✅ Enviar os dados do carro ao backend
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMensagem("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/cars",
        {
          brandId,
          model,
          description,
          specs,
          averagePrice,
          type,
          year,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        setMensagem("Carro cadastrado com sucesso! 🚀");
        setBrandId("");
        setModel("");
        setDescription("");
        setSpecs("");
        setAveragePrice("");
        setType("");
        setYear("");
      }
    } catch (error) {
      setMensagem(
        "Erro ao cadastrar carro. Verifique os dados e tente novamente."
      );
      console.error("Erro:", error);
    }
  };

  return (
    <div className="cartalogo-container">
      <h1>Cadastro de Veículos</h1>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="brand">Marca:</label>
          <select
            id="brand"
            value={brandId}
            onChange={(e) => setBrandId(e.target.value)}
            required
          >
            <option value="">Selecione a marca</option>
            {marcas.length > 0 ? (
              marcas.map((marca) => (
                <option key={marca.id} value={marca.id}>
                  {marca.name}
                </option>
              ))
            ) : (
              <option disabled>Nenhuma marca encontrada</option>
            )}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="model">Modelo:</label>
          <input
            id="model"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrição:</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="specs">Especificações:</label>
          <input
            id="specs"
            type="text"
            value={specs}
            onChange={(e) => setSpecs(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="averagePrice">Preço Médio:</label>
          <input
            id="averagePrice"
            type="number"
            value={averagePrice}
            onChange={(e) => setAveragePrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Tipo:</label>
          <input
            id="type"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Ano:</label>
          <input
            id="year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroCar;
