import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.connect.js";
import recipeRoute from "./router/recipe.route.js";

dotenv.config();

const PORT = process.env.PORT || 1030;

const app = express();

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/recipe", recipeRoute);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})