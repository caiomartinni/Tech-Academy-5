import React, { useState, useEffect } from "react";
import "./CadastroMarca.css";
import axios from "axios";

interface Brand {
  id: string;
  name: string;
}

const CadastroMarca: React.FC = () => {
  const [marca, setMarca] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [editBrandId, setEditBrandId] = useState<string>("");
  const [novoNomeMarca, setNovoNomeMarca] = useState<string>("");

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/brands", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBrands(response.data);
      if (response.data.length > 0) {
        setSelectedBrand(response.data[0].id);
        setEditBrandId(response.data[0].id);
      } else {
        setSelectedBrand("");
        setEditBrandId("");
      }
    } catch (error) {
      console.error("Erro ao buscar marcas:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMensagem("");

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3000/brands",
        { name: marca },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setMensagem("Marca cadastrada com sucesso!");
        setMarca("");
        fetchBrands();
      }
    } catch (error) {
      setMensagem(
        "Erro ao cadastrar marca. Verifique os dados e tente novamente."
      );
      console.error("Erro:", error);
    }
  };

  const handleDeleteBrand = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir essa marca?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/brands/${selectedBrand}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMensagem("Marca excluída com sucesso!");
      fetchBrands();
    } catch (error) {
      setMensagem("Erro ao excluir a marca. Tente novamente.");
      console.error("Erro ao deletar a marca:", error);
    }
  };

  const handleUpdateBrand = async () => {
    if (!novoNomeMarca.trim()) {
      setMensagem("Digite um novo nome válido.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/brands/${editBrandId}`,
        { name: novoNomeMarca },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMensagem("Marca atualizada com sucesso!");
      setNovoNomeMarca("");
      fetchBrands();
    } catch (error) {
      setMensagem("Erro ao atualizar a marca.");
      console.error("Erro ao atualizar a marca:", error);
    }
  };

  return (
    <div className="cartalogo-container">
      <h1>Cadastro de Marcas</h1>
      {mensagem && <p>{mensagem}</p>}

      {}
      <div className="delete-brand-section">
        <h2>Deletar Marca</h2>
        {brands && brands.length > 0 ? (
          <>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            <button className="btnex" onClick={handleDeleteBrand}>
              Excluir Marca
            </button>
          </>
        ) : (
          <p>Nenhuma marca cadastrada.</p>
        )}
      </div>

      {}
      <div className="update-brand-section">
        <h2>Atualizar Nome da Marca</h2>
        {brands && brands.length > 0 ? (
          <>
            <select
              value={editBrandId}
              onChange={(e) => setEditBrandId(e.target.value)}
            >
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            <input
              className="novomarca"
              type="text"
              placeholder="Novo nome da marca"
              value={novoNomeMarca}
              onChange={(e) => setNovoNomeMarca(e.target.value)}
            />
            <button onClick={handleUpdateBrand}>Atualizar Marca</button>
          </>
        ) : (
          <p>Nenhuma marca disponível para atualizar.</p>
        )}
      </div>

      {}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="nomemarca" htmlFor="marca">
            Cadastrar Marca:
          </label>
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
