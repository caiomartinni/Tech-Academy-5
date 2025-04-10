import axios from "axios";
import { useEffect, useState } from "react";
import "./CadastroCar.css";

interface Carro {
  id: number;
  brandId: number;
  model: string;
  description?: string;
  specs?: string;
  averagePrice?: number;
  type?: string;
  year?: number;
}

interface Marca {
  id: number;
  name: string;
}

const CadastroCar: React.FC = () => {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [carros, setCarros] = useState<Carro[]>([]);
  const [brandId, setBrandId] = useState("");
  const [selectedCarId, setSelectedCarId] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [specs, setSpecs] = useState("");
  const [averagePrice, setAveragePrice] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [modoEdicao, setModoEdicao] = useState(false);

  useEffect(() => {
    fetchMarcas();
    fetchCarros();
  }, []);

  const fetchMarcas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/brands");
      setMarcas(response.data);
    } catch {
      console.error("Erro ao buscar marcas");
    }
  };

  const fetchCarros = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/cars", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCarros(response.data);
    } catch {
      console.error("Erro ao buscar carros");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMensagem("");

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3000/cars",
        {
          brandId: Number(brandId),
          model,
          description,
          specs,
          averagePrice: Number(averagePrice),
          type,
          year: Number(year),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        setMensagem("Carro cadastrado com sucesso! 🚀");
        limparCampos();
        fetchCarros();
      }
    } catch {
      setMensagem("Erro ao cadastrar carro. Verifique os dados.");
    }
  };

  const handleDeleteCarro = async () => {
    if (!window.confirm("Deseja realmente excluir este carro?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/cars/${selectedCarId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMensagem("Carro excluído com sucesso!");
      fetchCarros();
    } catch {
      setMensagem("Erro ao excluir carro. Tente novamente.");
    }
  };

  const handleCarSelect = (carId: string) => {
    const carroSelecionado = carros.find(
      (carro) => carro.id.toString() === carId
    );
    if (carroSelecionado) {
      setSelectedCarId(carroSelecionado.id.toString());
      setBrandId(carroSelecionado.brandId?.toString() || "");
      setModel(carroSelecionado.model);
      setDescription(carroSelecionado.description || "");
      setSpecs(carroSelecionado.specs || "");
      setAveragePrice(carroSelecionado.averagePrice?.toString() || "");
      setType(carroSelecionado.type || "");
      setYear(carroSelecionado.year?.toString() || "");
      setModoEdicao(true);
    }
  };

  const handleUpdateCar = async () => {
    const token = localStorage.getItem("token");

    // Debug para verificar os dados antes do envio
    console.log("Enviando update:", {
      brandId: Number(brandId),
      model,
      description,
      specs,
      averagePrice: Number(averagePrice),
      type,
      year: Number(year),
    });

    try {
      const response = await axios.put(
        `http://localhost:3000/cars/${selectedCarId}`,
        {
          brandId: Number(brandId),
          model,
          description,
          specs,
          averagePrice: Number(averagePrice),
          type,
          year: Number(year),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setMensagem("Carro atualizado com sucesso!");
        limparCampos();
        fetchCarros();
        setModoEdicao(false);
      }
    } catch (error) {
      console.error("Erro ao atualizar carro:", error);
      setMensagem("Erro ao atualizar carro.");
    }
  };

  const limparCampos = () => {
    setBrandId("");
    setModel("");
    setDescription("");
    setSpecs("");
    setAveragePrice("");
    setType("");
    setYear("");
    setSelectedCarId("");
    setModoEdicao(false);
  };

  return (
    <div className="cartalogo-container">
      <h1>Cadastro de Veículos</h1>
      {mensagem && <p>{mensagem}</p>}

      {/* === DELETAR CARRO === */}
      <div className="delete-car-section">
        <h2>Deletar Carro</h2>
        {carros.length > 0 ? (
          <>
            <select
              value={selectedCarId}
              onChange={(e) => setSelectedCarId(e.target.value)}
            >
              {carros.map((carro) => (
                <option key={carro.id} value={carro.id}>
                  {carro.model}
                </option>
              ))}
            </select>
            <button className="btnex" onClick={handleDeleteCarro}>
              Excluir Carro
            </button>
          </>
        ) : (
          <p>Nenhum carro cadastrado.</p>
        )}
      </div>

      {/* === ATUALIZAR CARRO === */}
      <div className="update-car-section">
        <h2>Atualizar Carro</h2>
        <select
          onChange={(e) => handleCarSelect(e.target.value)}
          defaultValue=""
        >
          <option value="">Selecione um carro</option>
          {carros.map((carro) => (
            <option key={carro.id} value={carro.id}>
              {carro.model}
            </option>
          ))}
        </select>
      </div>

      {/* === FORMULÁRIO === */}
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
            {marcas.map((marca) => (
              <option key={marca.id} value={marca.id}>
                {marca.name}
              </option>
            ))}
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

        {modoEdicao ? (
          <button type="button" onClick={handleUpdateCar}>
            Atualizar Carro
          </button>
        ) : (
          <button type="submit">Cadastrar</button>
        )}
      </form>
    </div>
  );
};

export default CadastroCar;
