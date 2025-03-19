import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
});

export const registerSchema = z.object({
  first_name: z.string().min(2).max(20),
  last_name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6).max(20),
});

export const addTodoSchema = z.object({
  todoTitle: z.string(),
  todoContent: z.string(),
});

export const profileSchema = z.object({
  first_name: z.string().min(2).max(20),
  last_name: z.string().min(1),
  email: z.string().email(),
});

export const editAddTodoSchema = z.object({
  todoTitle: z.string(),
  todoContent: z.string(),
});
