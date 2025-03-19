import kyClient from "@/lib/ky/kyClient";
import {
  CheckExistingEmailType,
  DefaultType,
  RegisterSchemaType,
} from "@/lib/types";
import { HTTPError } from "ky";

const userRegister = async (fdata: RegisterSchemaType) => {
  try {
    const { data } = await kyClient
      .get("users", {
        next: { tags: ["userEmailCheck"] },
        searchParams: {
          filter: JSON.stringify({
            email: fdata.email,
          }),
        },
      })
      .json<DefaultType<CheckExistingEmailType[]>>();

    if (data.length === 0) {
      await kyClient.post("users", {
        next: { tags: ["authRegister"] },
        json: {
          email: fdata.email,
          first_name: fdata.first_name,
          last_name: fdata.last_name,
          password: fdata.password,
          role: "dcc34e14-8c8f-497d-9dce-be7e81c37595",
        },
      });

      return {
        success: true,
        message: "User registered Succesfully",
      };
    } else {
      return {
        success: false,
        message: `Email ${fdata.email} already esxits`,
      };
    }
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

export default userRegister;
