//levantar servidor
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import app from "./app.js";

dotenv.config();
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
