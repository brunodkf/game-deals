const CHEAPSHARK_DEALS_URL =
  'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15';

export async function GET() {
  try {
    const res = await fetch(CHEAPSHARK_DEALS_URL, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error(`[api/games] CheapShark responded with ${res.status}`);
      return new Response(JSON.stringify({ error: 'Failed to fetch deals' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[api/games] Failed to fetch deals:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch deals' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
