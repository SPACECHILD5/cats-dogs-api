import { NextResponse } from "next/server";
import { media } from "@/app/api/v1/_data/manifest";
import { corsHeaders } from "@/app/api/v1/_utils";

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

  if (pool.length === 0) {
    return NextResponse.json(
      { error: "No media found for given filters." },
      { status: 404, headers: corsHeaders() }
    );
  }

  const chosen = pool[Math.floor(Math.random() * pool.length)];
  const absoluteUrl = new URL(chosen.path, url.origin).toString();

  return NextResponse.json(
    {
      id: chosen.id,
      animal: chosen.animal,
      format: chosen.format,
      url: absoluteUrl,
      tags: chosen.tags ?? [],
    },
    {
      headers: { ...corsHeaders(), "Cache-Control": "public, max-age=60" },
    }
  );
}
