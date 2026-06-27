import { NextResponse } from 'next/server';

const CHEAPSHARK_DEALS_URL = 'https://www.cheapshark.com/api/1.0/deals';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const url = new URL(CHEAPSHARK_DEALS_URL);
    url.searchParams.set('pageSize', '60');

    const storeID = searchParams.get('storeID');
    const lowerPrice = searchParams.get('lowerPrice');
    const upperPrice = searchParams.get('upperPrice');

    if (storeID !== null) {
      const id = parseInt(storeID, 10);
      if (isNaN(id) || id <= 0) {
        return NextResponse.json({ error: 'Invalid storeID' }, { status: 400 });
      }
      url.searchParams.set('storeID', String(id));
    }

    if (lowerPrice !== null) {
      const price = parseFloat(lowerPrice);
      if (isNaN(price) || price < 0) {
        return NextResponse.json({ error: 'Invalid lowerPrice' }, { status: 400 });
      }
      url.searchParams.set('lowerPrice', String(price));
    }

    if (upperPrice !== null) {
      const price = parseFloat(upperPrice);
      if (isNaN(price) || price < 0) {
        return NextResponse.json({ error: 'Invalid upperPrice' }, { status: 400 });
      }
      url.searchParams.set('upperPrice', String(price));
    }

    const res = await fetch(url.toString(), { cache: 'no-store' });

    if (!res.ok) {
      console.error(`[api/games] CheapShark returned ${res.status} for: ${url.toString()}`);
      return NextResponse.json(
        { error: 'Falha ao buscar ofertas da fonte externa' },
        { status: 502 }
      );
    }

    const data: unknown = await res.json();

    if (!Array.isArray(data)) {
      console.error('[api/games] Unexpected response shape from CheapShark');
      return NextResponse.json(
        { error: 'Resposta inesperada da fonte externa' },
        { status: 502 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[api/games] Unexpected error:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
