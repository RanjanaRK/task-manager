import kyClient from "@/lib/ky/kyClient";
import { AddTodoSchemaType } from "@/lib/types";
import { HTTPError } from "ky";

const postTodoItem = async (fdata: AddTodoSchemaType) => {
  try {
    await kyClient.post("items/todos", {
      next: {
        tags: ["postTodoItem"],
      },
      json: fdata,
    });

    return {
      success: true,
      message: "Successfully post your todo",
    };
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const httpError = error as HTTPError;
      const errorJson = await httpError.response.json<any>();
      return {
        success: false,
        message: errorJson.errors[0].message as string,
      };
    } else {
      return {
        success: false,
        message: "Network Error",
      };
    }
  }
};

export default postTodoItem;
