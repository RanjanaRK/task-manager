import kyServer from "@/lib/ky/kyServer";
import { DefaultType } from "@/lib/types";
import { User } from "@directus/types";
import { HTTPError } from "ky";
import { cookies } from "next/headers";

const userByAuth = async () => {
  const token = (await cookies()).get("directus_session_token")?.value;

  try {
    const { data } = await kyServer
      .get("users/me", {
        next: { tags: ["authUser"] },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<DefaultType<User>>();
    console.log(data);

    return {
      data: data,
      isError: false,
      error: null,
    };
  } catch (error: any) {
    const httpError = error as HTTPError;
    const errorJson = await httpError.response.json<any>(); // eslint-disable-line

    return {
      data: null,
      isError: true,
      error: errorJson.errors[0].message,
    };
  }
};

export default userByAuth;
