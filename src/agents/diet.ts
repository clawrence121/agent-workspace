/**
 * This agent helps to track meals over time to provide feedback
 * and make suggestions
 */

import { CoreMessage, streamText } from "ai";
import { Agent } from "./agent.interface";
import { model } from "@/lib/ai";
import { z } from "zod";

const RECIPES: z.infer<typeof RecipeSchema>[] = [];

export class DietAgent implements Agent {
  role =
    "You are a dietician that help to process food logs and make suggestions on how to improve health through diet over time.";

  async sendMessage(messages: CoreMessage[]) {
    try {
      return streamText({
        model: model,
        messages: [
          {
            role: "system",
            content: this.role,
          },
          ...messages,
        ],
        tools: {
          addRecipe: {
            description:
              "Add a recipe to my log for later recall and trend analysis. If there are duplicates in the log, don't save the new recipe.",
            parameters: RecipeSchema,
            execute: async (recipe) => {
              RECIPES.push(recipe);
              return RECIPES;
            },
          },
          getRecipes: {
            description:
              "Get all of my saved recipes so we can perform analysis and get insights.",
            parameters: z.object({}),
            execute: async () => {
              return RECIPES;
            },
          },
        },
        onStepFinish: (args) => console.log(args),
        maxSteps: 5,
      }).toDataStreamResponse();
    } catch (e) {
      console.log(e);
    }
  }
}

const IngredientSchema = z.object({
  name: z.string().describe("The name of the ingredient"),
  quantity: z
    .string()
    .describe("The amount of the ingredient needed for the recipe"),
  fodmap: z
    .string()
    .describe(
      "The FODMAP classification of the ingredient (Low, Moderate, High, etc.)",
    ),
});

const NutritionalValuesSchema = z.object({
  energy: z.string().describe("Energy content of the dish in kJ and kcal"),
  fat: z.string().describe("Total fat content per serving"),
  saturates: z.string().describe("Saturated fat content per serving"),
  carbohydrate: z.string().describe("Total carbohydrate content per serving"),
  sugars: z.string().describe("Sugar content per serving"),
  fiber: z.string().describe("Fiber content per serving"),
  protein: z.string().describe("Protein content per serving"),
  sodium: z.string().describe("Sodium content per serving"),
  portion_size: z.string().describe("Weight of a single portion"),
});

const RecipeSchema = z.object({
  name: z.string().describe("The full name of the recipe"),
  calories: z.number().describe("Calorie content per serving"),
  fodmap_status: z
    .string()
    .describe("Overall FODMAP classification of the recipe"),
  ingredients: z
    .array(IngredientSchema)
    .describe("List of ingredients needed for the recipe"),
  nutritional_values: NutritionalValuesSchema.describe(
    "Detailed nutritional information for the recipe",
  ),
  allergens: z
    .array(z.string())
    .describe("List of allergens present in the recipe"),
});

const RecipesSchema = z.object({
  recipes: z
    .array(RecipeSchema)
    .describe("Collection of recipes with detailed information"),
});

export type Ingredient = z.infer<typeof IngredientSchema>;
export type NutritionalValues = z.infer<typeof NutritionalValuesSchema>;
export type Recipe = z.infer<typeof RecipeSchema>;
export type Recipes = z.infer<typeof RecipesSchema>;
