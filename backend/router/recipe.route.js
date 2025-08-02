import express from "express";
import { addRecipe, allRecipe, authorByRecipe, deleteRecipe, findLevelRecipe, titleByRecipe, updateByIdRecipe, updateByTitleRecipe } from "../controller/recipe.controller.js";

const recipeRoute = express.Router();

recipeRoute.route("/add").post(addRecipe);
recipeRoute.route("/").get(allRecipe);
recipeRoute.route("/title/:title").get(titleByRecipe);
recipeRoute.route("/author/:author").get(authorByRecipe);
recipeRoute.route("/difficulty").get(findLevelRecipe);
recipeRoute.route("/update/:id").put(updateByIdRecipe);
recipeRoute.route("/update/title/:title").put(updateByTitleRecipe);
recipeRoute.route("/delete/:id").delete(deleteRecipe);

export default recipeRoute