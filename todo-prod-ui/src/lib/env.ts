const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL as string,
  API_URL: process.env.API_URL as string,
  USER_ROLE: process.env.USER_ROLE as string,
  AUTH_SECRET: process.env.AUTH_SECRET as string,
};

export default env;
