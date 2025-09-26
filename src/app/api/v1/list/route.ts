// import { NextResponse } from "next/server";
// import { media } from "../_data/manifest";
// import { corsHeaders } from "../_util";

import { NextResponse } from "next/server";
import { media } from "@/app/api/v1/_data/manifest";
import { corsHeaders } from "@/app/api/v1/_utils";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

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

  return NextResponse.json(
    {
      count: pool.length,
      itmes: pool,
    },
    {
      headers: {
        ...corsHeaders(),
        "Cache-Control": "public, s-maxage=600, stale-white-revalidate=86400",
      },
    }
  );
}
