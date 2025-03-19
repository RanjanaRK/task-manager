import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import env from "./lib/env";

// This function can be marked `async` if using `await` inside
export const middleware = async (request: NextRequest) => {
  const cookiesToken = request.cookies.get("directus_session_token")?.value;

  const secret = new TextEncoder().encode(env.AUTH_SECRET);

  if (cookiesToken === undefined || cookiesToken === "") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    await jwtVerify(cookiesToken, secret);

    return NextResponse.next();
  } catch (error) {
    const customResponse = NextResponse.redirect(
      new URL("/auth/login", request.url),
    );

    customResponse.cookies.delete("directus_session_token");

    return customResponse;
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile"],
};
