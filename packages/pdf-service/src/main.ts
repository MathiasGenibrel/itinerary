// main.ts

import express from "express";
import mapRoutes from "./routes/mapRoutes";
import cors from "cors";

const app = express();

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "POST",
    credentials: true,
  }),
);

// Montez vos routes
app.use("/api/map", mapRoutes);

// Autres routes et configurations

app.listen(5001, () => {
  console.log("Serveur en écoute sur le port 5001");
});
