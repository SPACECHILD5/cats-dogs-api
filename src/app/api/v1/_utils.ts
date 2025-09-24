export function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Method": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-api-key",
  } as const;
}
