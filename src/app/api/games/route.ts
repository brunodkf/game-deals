import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const CHEAPSHARK_DEALS_URL = 'https://www.cheapshark.com/api/1.0/deals';
const FETCH_TIMEOUT_MS = 8000;

function log(level: 'info' | 'warn' | 'error', event: string, data: Record<string, unknown>) {
  const entry = JSON.stringify({ level, event, ...data, ts: new Date().toISOString() });
  if (level === 'error') console.error(entry);
  else if (level === 'warn') console.warn(entry);
  else console.info(entry);
}

export async function GET(request: Request) {
  const start = Date.now();

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

    const cheapsharkUrl = url.toString();

    const res = await fetch(cheapsharkUrl, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    const elapsed = Date.now() - start;

    if (!res.ok) {
      let responseBody = '';
      try { responseBody = await res.text(); } catch { /* ignore */ }

      log('error', 'cheapshark_error', {
        upstream_url: cheapsharkUrl,
        status: res.status,
        status_text: res.statusText,
        response_body: responseBody.slice(0, 300),
        elapsed_ms: elapsed,
      });

      if (res.status === 429) {
        return NextResponse.json(
          { error: 'Serviço temporariamente indisponível. Tente novamente em instantes.' },
          { status: 503 }
        );
      }

      return NextResponse.json(
        { error: 'Falha ao buscar ofertas da fonte externa' },
        { status: 502 }
      );
    }

    const data: unknown = await res.json();
    const elapsed2 = Date.now() - start;

    if (!Array.isArray(data)) {
      log('error', 'cheapshark_invalid_shape', {
        upstream_url: cheapsharkUrl,
        received_type: typeof data,
        elapsed_ms: elapsed2,
      });
      return NextResponse.json(
        { error: 'Resposta inesperada da fonte externa' },
        { status: 502 }
      );
    }

    log('info', 'cheapshark_ok', {
      upstream_url: cheapsharkUrl,
      count: data.length,
      elapsed_ms: elapsed2,
    });

    return NextResponse.json(data);
  } catch (error) {
    const elapsed = Date.now() - start;
    const isTimeout = error instanceof Error && error.name === 'TimeoutError';
    const isNetwork = error instanceof TypeError;

    log('error', 'route_exception', {
      error_type: error instanceof Error ? error.constructor.name : typeof error,
      error_name: error instanceof Error ? error.name : null,
      message: error instanceof Error ? error.message : String(error),
      is_timeout: isTimeout,
      is_network: isNetwork,
      elapsed_ms: elapsed,
    });

    if (isTimeout) {
      return NextResponse.json(
        { error: 'Tempo de resposta excedido. Tente novamente.' },
        { status: 504 }
      );
    }

    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
