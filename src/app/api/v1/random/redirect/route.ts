import { NextResponse } from "next/server";
import { media } from "@/app/api/v1/_data/manifest";
import { corsHeaders } from "@/app/api/v1/_utils";
import { error } from "console";

export const runtime = "edge";

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders() });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const animal = url.searchParams.get("animal");
  const format = url.searchParams.get("format");

  let pool = media;
  if (animal) pool = pool.filter((x) => x.animal === animal);
  if (format) pool = pool.filter((x) => x.format === format);

  if (pool.length === 0)
    return new NextResponse("Not Found", {
      status: 404,
      headers: corsHeaders(),
    });

  const chosen = pool[Math.floor(Math.random() * pool.length)];
  const absoluteUrl = new URL(chosen.path, url.origin);

  const res = NextResponse.redirect(absoluteUrl);
  Object.entries(corsHeaders()).forEach(([k, v]) => res.headers.set(k, v));
  return res;
}
