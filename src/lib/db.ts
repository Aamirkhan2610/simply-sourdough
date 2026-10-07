import { Pool } from "pg";

/**
 * Connection string set by whichever Postgres provider is connected in Vercel
 * (Neon, Supabase and Prisma Postgres all populate one of these).
 */
function connectionString(): string {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    ""
  ).trim();
}

export function isDatabaseConfigured(): boolean {
  return connectionString().length > 0;
}

/** Reuse one pool across warm serverless invocations. */
declare global {
  var __ssPgPool: Pool | undefined;
}

function getPool(): Pool | null {
  const url = connectionString();
  if (!url) return null;
  if (!globalThis.__ssPgPool) {
    const local = /@(localhost|127\.0\.0\.1)[:/]/.test(url);
    globalThis.__ssPgPool = new Pool({
      connectionString: url,
      max: 2,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 8_000,
      // Hosted Postgres always needs TLS; local dev usually does not.
      ssl: local ? undefined : { rejectUnauthorized: false },
    });
    globalThis.__ssPgPool.on("error", (error) => {
      console.error("postgres pool error", error);
    });
  }
  return globalThis.__ssPgPool;
}

export async function query<T extends Record<string, unknown>>(
  text: string,
  params: unknown[] = []
): Promise<T[]> {
  const pool = getPool();
  if (!pool) throw new Error("No database is configured.");
  const result = await pool.query(text, params);
  return result.rows as T[];
}

/**
 * Create the settings table on first use. Cached per warm instance so we do not
 * pay a round trip on every request.
 */
let schemaReady: Promise<void> | null = null;

export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = query(`
      create table if not exists app_settings (
        key text primary key,
        value jsonb not null,
        updated_at timestamptz not null default now()
      )
    `)
      .then(() => undefined)
      .catch((error) => {
        // Let the next call retry instead of caching the failure forever.
        schemaReady = null;
        throw error;
      });
  }
  return schemaReady;
}

export async function readSetting<T>(key: string): Promise<T | null> {
  await ensureSchema();
  const rows = await query<{ value: T }>(
    "select value from app_settings where key = $1",
    [key]
  );
  return rows.length ? rows[0].value : null;
}

export async function writeSetting<T>(key: string, value: T): Promise<void> {
  await ensureSchema();
  await query(
    `insert into app_settings (key, value, updated_at)
     values ($1, $2::jsonb, now())
     on conflict (key) do update set value = excluded.value, updated_at = now()`,
    [key, JSON.stringify(value)]
  );
}
