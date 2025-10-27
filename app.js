import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import reservationRoutes from "./routes/reservationRouter.js";
import { verifyToken } from "./utils/verifyToken.js";



const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
//RUTAS
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute, verifyToken);
app.use("/api/hotels", hotelsRoute, verifyToken);
app.use("/api/rooms", roomsRoute, verifyToken);
app.use("/api/", reservationRoutes, verifyToken);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});



export default app;