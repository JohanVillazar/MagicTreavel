//levantar servidor
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import app from "./app.js";

dotenv.config();
//CORS
app.use(cors({
  origin: [
    "https://magictravel.vercel.app", // URL frontend desplegado en Vercel
    "http://localhost:5173"           // para entorno local (Vite/React)
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

mongoose.set("strictQuery", false);
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO;
//CONEXION A MONGO
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conection Mongo successfull");

    app.listen(PORT, () => {
      console.log(` Server runing on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err.message);
  });
