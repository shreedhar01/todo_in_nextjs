import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon(process.env.DATABASE_URI!);
// Provide the schema object to drizzle so the DB instance is properly typed
export const db = drizzle(sql, { schema });
