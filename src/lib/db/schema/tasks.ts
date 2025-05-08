import { pgTable, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const taskStatusEnum = pgEnum("task_status", ["Completed", "Pending"]);

export const tasks = pgTable("tasks", {
  task_id: text("task_id").primaryKey(),
  description: text("description").notNull(),
  due_date: timestamp("due_date"),
  status: taskStatusEnum("status").notNull(),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
