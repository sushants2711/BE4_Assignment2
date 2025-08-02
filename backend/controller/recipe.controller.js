import mongoose from "mongoose";
import recipeModel from "../model/recipe.model.js";

export const addRecipe = async (req, res) => {
    try {
        const {
            title,
            author,
            difficulty,
            prepTime,
            cookTime,
            ingredients,
            instructions,
            imageUrl,
        } = req.body;

        if (
            !title ||
            !author ||
            !prepTime ||
            !cookTime ||
            !ingredients ||
            !instructions ||
            !imageUrl
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const data = new recipeModel({
            title,
            author,
            difficulty,
            prepTime,
            cookTime,
            ingredients,
            instructions,
            imageUrl,
        });

        const result = await data.save();

        return res.status(201).json({
            success: true,
            message: "Data created successfully",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const allRecipe = async (req, res) => {
    try {
        const data = await recipeModel.find();

        if (!data || data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data fetch successfully",
            data: data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const titleByRecipe = async (req, res) => {
    try {
        const { title } = req.params;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is missing.",
            });
        }

        const result = await recipeModel.findOne({ title: title });

        if (!result || result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data fetch successfully",
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const authorByRecipe = async (req, res) => {
    try {
        const { author } = req.params;

        if (!author) {
            return res.status(400).json({
                success: false,
                message: "author params is missing.",
            });
        }

        const result = await recipeModel.find({ author: author });

        if (!result || result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data fetch successfully.",
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const findLevelRecipe = async (req, res) => {
    try {
        const result = await recipeModel.find({ difficulty: "Easy" });

        if (!result || result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data fetch successfully",
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const updateByIdRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const { difficulty } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is missing.",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                message: "Invalid mongo id",
            });
        }

        if (!difficulty) {
            return res.status(400).json({
                success: false,
                message: "Difficulty field is required.",
            });
        }

        const recipeExist = await recipeModel.findById(id);

        if (!recipeExist) {
            return res.status(404).json({
                success: false,
                message: "Recipe not exist.",
            });
        }

        const data = {
            title: recipeExist.title,
            author: recipeExist.author,
            difficulty: difficulty || recipeExist.difficult,
            prepTime: recipeExist.prepTime,
            cookTime: recipeExist.cookTime,
            ingredients: recipeExist.ingredients,
            instructions: recipeExist.instructions,
            imageUrl: recipeExist.imageUrl,
        };

        const updateData = await recipeModel.findByIdAndUpdate(id, data, {
            new: true,
        });

        if (!updateData) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Failed to update the data."
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Data update successffully",
                data: updateData
            })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const updateByTitleRecipe = async (req, res) => {
    try {
        const { title } = req.params;
        const { prepTime, cookTime } = req.body;

        if (!title) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Title params is missing."
                });
        };

        if (!prepTime || !cookTime) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "All fields is required."
                });
        };

        const recipeExist = await recipeModel.findOne({ title: title });

        if (!recipeExist) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Recipe not found."
                });
        };

        const data = {
            title: recipeExist.title,
            author: recipeExist.author,
            difficulty: recipeExist.difficult,
            prepTime: prepTime || recipeExist.prepTime,
            cookTime: cookTime || recipeExist.cookTime,
            ingredients: recipeExist.ingredients,
            instructions: recipeExist.instructions,
            imageUrl: recipeExist.imageUrl,
        };

        const updateData = await recipeModel.findOneAndUpdate({ title: title }, data, { new: true });

        if (!updateData) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Failed to update the data."
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Data update successfully",
                data: updateData
            })

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server error",
                error: error.message
            })
    }
};

export const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is missing.",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                message: "Invalid mongo id",
            });
        }

        const recipeExist = await recipeModel.findById(id);

        if (!recipeExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Recipe not exist"
                });
        };


        const dataDelete = await recipeModel.findByIdAndDelete(id)

        if (!dataDelete) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Failed to delete the data"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Data deleted successfully"
            });
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            })
    }
};