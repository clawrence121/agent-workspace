import { tool } from "ai";
import { z } from "zod";
import { db } from "../../db";
import { tasks } from "../../db/schema/tasks";
import { eq } from "drizzle-orm";
import crypto from "crypto";

// Create Task Tool
export const createTask = tool({
  description: "Create a new task for a specific user with a description.",
  parameters: z.object({
    description: z
      .string()
      .max(255)
      .describe("A brief description of the task."),
    dueDate: z
      .string()
      .datetime()
      .optional()
      .describe(
        "The due date for the task (optional). Must be in ISO UTC date time format.",
      ),
    userId: z
      .string()
      .nonempty()
      .describe("The ID of the user creating the task."),
  }),
  execute: async ({ description, dueDate, userId }) => {
    console.log("Executing createTask tool:", { description, dueDate, userId });
    try {
      const [newTask] = await db
        .insert(tasks)
        .values({
          task_id: crypto.randomUUID(),
          description,
          due_date: dueDate ? new Date(dueDate) : null,
          status: "Pending",
          user_id: userId,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning();

      return { success: true, task: newTask };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Error creating task:", error);
      return {
        success: false,
        message: `Failed to create task: ${errorMessage}`,
      };
    }
  },
});

// Read Tasks Tool
export const readTasks = tool({
  description: "Retrieve a list of tasks for a specific user by their user ID.",
  parameters: z.object({
    userId: z
      .string()
      .nonempty()
      .describe("The ID of the user whose tasks you want to retrieve."),
  }),
  execute: async ({ userId }) => {
    console.log("Executing readTasks tool:", { userId });
    try {
      const userTasks = await db
        .select()
        .from(tasks)
        .where(eq(tasks.user_id, userId))
        .execute();

      return userTasks;
    } catch (error: unknown) {
      console.error("Error reading tasks:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to read tasks",
      );
    }
  },
});

// Update Task Tool
export const updateTask = tool({
  description: "Update task details including description and status.",
  parameters: z.object({
    taskId: z
      .string()
      .describe("The unique identifier for the task to be updated."),
    description: z
      .string()
      .optional()
      .describe("The new description of the task."),
    dueDate: z
      .string()
      .datetime()
      .optional()
      .describe("The due date for the task."),
    status: z
      .enum(["Completed", "Pending"])
      .optional()
      .describe("The new status of the task."),
  }),
  execute: async ({ taskId, description, dueDate, status }) => {
    console.log("Executing updateTask tool:", {
      taskId,
      description,
      dueDate,
      status,
    });
    try {
      await db
        .update(tasks)
        .set({
          ...(description && { description }),
          ...(dueDate && { due_date: new Date(dueDate) }),
          ...(status && { status }),
        })
        .where(eq(tasks.task_id, taskId.toString()))
        .execute();

      return { success: true, message: "Task updated successfully." };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Error updating task:", error);
      return {
        success: false,
        message: `Error updating task: ${errorMessage}`,
      };
    }
  },
});

// Delete Task Tool
export const deleteTask = tool({
  description: "Delete a task by its ID.",
  parameters: z.object({
    taskId: z.string().describe("The ID of the task to delete."),
  }),
  execute: async ({ taskId }) => {
    console.log("Executing deleteTask tool:", { taskId });
    try {
      const result = await db
        .delete(tasks)
        .where(eq(tasks.task_id, taskId))
        .execute();

      if (!result) {
        return {
          success: false,
          message: "Task not found or unable to delete.",
        };
      }

      return { success: true, message: "Task successfully deleted." };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Error deleting task:", error);
      return {
        success: false,
        message: `Error deleting task: ${errorMessage}`,
      };
    }
  },
});
