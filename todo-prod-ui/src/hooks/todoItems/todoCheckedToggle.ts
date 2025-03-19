import kyClient from "@/lib/ky/kyClient";
import { HTTPError } from "ky";

const todoCheckedToggle = async (todoCheckedID: string, checked: boolean) => {
  try {
    await kyClient.patch(`items/todos/${todoCheckedID}`, {
      next: {
        tags: ["todoCheckedToggle"],
      },
      json: {
        todoCheck: checked,
      },
    });
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

export default todoCheckedToggle;
