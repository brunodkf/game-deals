import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { CHEAPSHARK_HEADERS } from '@/lib/cheapshark';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ---------------------------------------------------------------------------
// ENDPOINT TEMPORÁRIO DE DIAGNÓSTICO — remover após investigação concluída
// Não possui lógica de negócio, cache, parse ou transformação.
// Propósito único: revelar o que a Vercel recebe da CheapShark.
// ---------------------------------------------------------------------------

interface ProbeResult {
  url: string;
  ok: boolean | null;
  status: number | null;
  status_text: string | null;
  headers: Record<string, string> | null;
  body_preview: string | null;
  body_length: number | null;
  elapsed_ms: number;
  error: { name: string; message: string; stack: string | null } | null;
}

async function probe(url: string, extraHeaders?: Record<string, string>): Promise<ProbeResult> {
  const start = Date.now();
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
      headers: extraHeaders,
    });
    const elapsed = Date.now() - start;

    const headers: Record<string, string> = {};
    res.headers.forEach((v, k) => { headers[k] = v; });

    let rawBody = '';
    try { rawBody = await res.text(); } catch { rawBody = '[failed to read body]'; }

    return {
      url,
      ok: res.ok,
      status: res.status,
      status_text: res.statusText,
      headers,
      body_preview: rawBody.slice(0, 1000),
      body_length: rawBody.length,
      elapsed_ms: elapsed,
      error: null,
    };
  } catch (err) {
    return {
      url,
      ok: null,
      status: null,
      status_text: null,
      headers: null,
      body_preview: null,
      body_length: null,
      elapsed_ms: Date.now() - start,
      error: {
        name: err instanceof Error ? err.name : typeof err,
        message: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? (err.stack ?? null) : null,
      },
    };
  }
}

export async function GET() {
  const requestId = randomUUID();
  const ts = new Date().toISOString();

  // Probe de controle (sem headers) + quatro probes com CHEAPSHARK_HEADERS.
  // O probe de controle documenta o comportamento bloqueado para referência.
  const [
    r_no_headers,
    r_no_params,
    r_pagesize,
    r_pagesize_store,
    r_store_only,
  ] = await Promise.all([
    probe('https://www.cheapshark.com/api/1.0/deals?pageSize=60'),
    probe('https://www.cheapshark.com/api/1.0/deals', CHEAPSHARK_HEADERS),
    probe('https://www.cheapshark.com/api/1.0/deals?pageSize=60', CHEAPSHARK_HEADERS),
    probe('https://www.cheapshark.com/api/1.0/deals?pageSize=60&storeID=1', CHEAPSHARK_HEADERS),
    probe('https://www.cheapshark.com/api/1.0/deals?storeID=1', CHEAPSHARK_HEADERS),
  ]);

  const report = {
    request_id: requestId,
    ts,
    runtime_info: {
      node_version: process.version,
      vercel_region: process.env.VERCEL_REGION ?? null,
      vercel_url: process.env.VERCEL_URL ?? null,
      next_runtime: process.env.NEXT_RUNTIME ?? null,
    },
    probes: {
      control_no_headers:  r_no_headers,
      no_params:           r_no_params,
      pagesize_60:         r_pagesize,
      pagesize_60_store_1: r_pagesize_store,
      store_1_only:        r_store_only,
    },
  };

  console.error(JSON.stringify({
    event: 'debug_cheapshark',
    request_id: requestId,
    ts,
    summary: Object.fromEntries(
      Object.entries(report.probes).map(([k, v]) => [k, { status: v.status, ok: v.ok, elapsed_ms: v.elapsed_ms }])
    ),
    probes_full: report.probes,
    runtime_info: report.runtime_info,
  }, null, 2));

  return NextResponse.json(report, {
    headers: { 'cache-control': 'no-store' },
  });
}
