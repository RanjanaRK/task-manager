import { z } from "zod";
import {
  addTodoSchema,
  editAddTodoSchema,
  loginSchema,
  profileSchema,
  registerSchema,
} from "./zodSchema";

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type AddTodoSchemaType = z.infer<typeof addTodoSchema>;
export type EditAddTodoSchemaType = z.infer<typeof editAddTodoSchema>;
export type ProfileSchemaType = z.infer<typeof profileSchema>;

export type DefaultType<T> = {
  data: T;
};

export type CheckExistingEmailType = {
  email: string;
};
export type TodoType = {
  id: string;
  todoCheck: boolean;
  todoTitle: string;
  todoContent: string;
};
