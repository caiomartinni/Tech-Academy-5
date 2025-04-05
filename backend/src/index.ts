import express from "express";
import cors from "cors";
import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";
import carRoutes from "./routes/carRoutes";
import brandRoutes from "./routes/brandRoutes";
import loginRoutes from "./routes/loginRoutes";

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permite acesso externo
app.use(express.json());

// Rotas
app.use("/api", loginRoutes);
app.use("/api", userRoutes);
app.use("/api", carRoutes);
app.use("/api", brandRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.send("API funcionando! 🚀");
});

// Sincroniza o banco de dados
sequelize
  .sync({ alter: true }) // alter mantém as tabelas atualizadas sem perder dados
  .then(() => {
    console.log("Banco de dados sincronizado com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar banco de dados:", error);
  });

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
