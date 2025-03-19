import kyClient from "@/lib/ky/kyClient";
import { ProfileSchemaType } from "@/lib/types";
import { HTTPError } from "ky";

const userUpdateForm = async (fdata: ProfileSchemaType) => {
  try {
    await kyClient.patch("users/me", {
      next: { tags: ["updateProfileByAuth"] },
      json: fdata,
    });

    return {
      success: true,
      message: "Updated Successfully",
    };
    // eslint-disable-next-line
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const httpError = error as HTTPError;
      const errorJson = await httpError.response.json<any>(); // eslint-disable-line

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

export default userUpdateForm;
