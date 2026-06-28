import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

export const runtime = 'nodejs';

const CHEAPSHARK_DEALS_URL = 'https://www.cheapshark.com/api/1.0/deals';
const FETCH_TIMEOUT_MS = 8000;

function collectHeaders(headers: Headers): Record<string, string> {
  const out: Record<string, string> = {};
  headers.forEach((v, k) => { out[k] = v; });
  return out;
}

function diagnostic(path: string, fields: Record<string, unknown>): void {
  const sep = '='.repeat(60);
  const lines: string[] = [sep, `PATH: ${path}`, ''];
  for (const [k, v] of Object.entries(fields)) {
    const val =
      v === null || v === undefined ? 'null' :
      typeof v === 'object' ? JSON.stringify(v, null, 2) :
      String(v);
    lines.push(`${k}:\n${val}`, '');
  }
  lines.push(sep);
  console.error(lines.join('\n'));
}

function log(level: 'info' | 'warn' | 'error', event: string, data: Record<string, unknown>) {
  const entry = JSON.stringify({ level, event, ...data, ts: new Date().toISOString() });
  if (level === 'error') console.error(entry);
  else if (level === 'warn') console.warn(entry);
  else console.info(entry);
}

export async function GET(request: Request) {
  const start = Date.now();
  const requestId = randomUUID();

  const { searchParams } = new URL(request.url);
  const rawStoreID = searchParams.get('storeID');
  const rawLowerPrice = searchParams.get('lowerPrice');
  const rawUpperPrice = searchParams.get('upperPrice');
  const requestParams = {
    storeID: rawStoreID,
    lowerPrice: rawLowerPrice,
    upperPrice: rawUpperPrice,
  };

  let cheapsharkUrl = '';

  try {
    const url = new URL(CHEAPSHARK_DEALS_URL);
    url.searchParams.set('pageSize', '60');

    if (rawStoreID !== null) {
      const id = parseInt(rawStoreID, 10);
      if (isNaN(id) || id <= 0) {
        return NextResponse.json({ error: 'Invalid storeID' }, { status: 400 });
      }
      url.searchParams.set('storeID', String(id));
    }

    if (rawLowerPrice !== null) {
      const price = parseFloat(rawLowerPrice);
      if (isNaN(price) || price < 0) {
        return NextResponse.json({ error: 'Invalid lowerPrice' }, { status: 400 });
      }
      url.searchParams.set('lowerPrice', String(price));
    }

    if (rawUpperPrice !== null) {
      const price = parseFloat(rawUpperPrice);
      if (isNaN(price) || price < 0) {
        return NextResponse.json({ error: 'Invalid upperPrice' }, { status: 400 });
      }
      url.searchParams.set('upperPrice', String(price));
    }

    cheapsharkUrl = url.toString();

    const res = await fetch(cheapsharkUrl, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    const elapsed = Date.now() - start;

    if (!res.ok) {
      let responseBody = '';
      try { responseBody = await res.text(); } catch { /* ignore */ }

      const path =
        res.status === 429 ? 'upstream_429' :
        res.status >= 500  ? 'upstream_5xx' :
                             'upstream_4xx';

      diagnostic(path, {
        request_id: requestId,
        upstream_url: cheapsharkUrl,
        request_params: requestParams,
        status: res.status,
        status_text: res.statusText,
        upstream_headers: collectHeaders(res.headers),
        response_body: responseBody.slice(0, 500),
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

    let data: unknown;
    try {
      data = await res.json();
    } catch (parseError) {
      const elapsed2 = Date.now() - start;
      diagnostic('json_parse_error', {
        request_id: requestId,
        upstream_url: cheapsharkUrl,
        request_params: requestParams,
        upstream_status: res.status,
        error_name: parseError instanceof Error ? parseError.name : 'unknown',
        error_message: parseError instanceof Error ? parseError.message : String(parseError),
        stack: parseError instanceof Error ? (parseError.stack ?? null) : null,
        elapsed_ms: elapsed2,
      });
      return NextResponse.json(
        { error: 'Resposta inesperada da fonte externa' },
        { status: 502 }
      );
    }

    const elapsed2 = Date.now() - start;

    if (!Array.isArray(data)) {
      diagnostic('invalid_shape', {
        request_id: requestId,
        upstream_url: cheapsharkUrl,
        request_params: requestParams,
        upstream_status: res.status,
        received_type: typeof data,
        received_preview: JSON.stringify(data).slice(0, 200),
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
    const isAbort   = error instanceof Error && error.name === 'AbortError';
    const isNetwork = error instanceof TypeError;

    const path =
      isTimeout ? 'timeout' :
      isAbort   ? 'abort'   :
      isNetwork ? 'network_error' :
                  'unknown_exception';

    diagnostic(path, {
      request_id: requestId,
      upstream_url: cheapsharkUrl || 'not_yet_constructed',
      request_params: requestParams,
      error_name: error instanceof Error ? error.name : typeof error,
      error_message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? (error.stack ?? null) : null,
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
