import ky from "ky";
import env from "../env";

const kyServer = ky.create({
  prefixUrl: env.API_URL,
  credentials: "include",
  mode: "cors",
  cache: "no-store",
});

export default kyServer;
