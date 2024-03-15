"use server"

import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import parse from "@/lib/setCookieParser";

const API_URL = process.env.API_URL;

export async function POST(request) {
  const body = await request.json();

  const { email, password } = body;

  const authRequest = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
  .catch((error) => {
    console.error(error);
    // return new Response(JSON.stringify({message: "Error"}), {
    //   status: 500,
    // });
  });
  if (authRequest.status !== 202) {
    return new Response(JSON.stringify({message: "Not authenticed"}), {
      status: 401,
    });
  }
  const cookiesToSet = parse(authRequest.headers.get("Set-Cookie"));
  cookiesToSet.forEach((cookie) => {
    cookies().set({
      name: cookie.name,
      value: cookie.value,
      path: cookie.path,
      httpOnly: cookie.httpOnly,
      sameSite: cookie.sameSite
    });
  })

  return new Response(JSON.stringify({message: "Authenticated!"}), {
    status: 202
  });
}