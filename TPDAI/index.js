import express from "express";
import cors from "cors";
import passport from 'passport';
import { jwtStrategy } from './src/common/jwt.strategy.js';
import PersonaRouter from "./src/controllers/PersonaController.js";
import MovieRouter from "./src/controllers/MovieController.js";
import TokenRouter from "./src/controllers/TokenController.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
passport.use(jwtStrategy);
app.use(passport.initialize());

app.use("/characters", PersonaRouter);
app.use("/movies", MovieRouter);
app.use("/auth", TokenRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});