import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';

// Database instance
let db: Database | null = null;

// Initialize the database
async function initDB(): Promise<void> {
  db = await open({
    filename: './database.db',
    driver: sqlite3.Database,
  });
  await db.run('CREATE TABLE IF NOT EXISTS cache (key TEXT PRIMARY KEY, value TEXT)');
}

export async function sqliteSetKeyValue(key: string, value: any): Promise<void> {
  if (!db) await initDB();

  return new Promise((resolve, reject) => {
    if (!key || value === undefined) {
      return reject(new Error("Invalid key or value"));
    }
    const valueStr = JSON.stringify(value);
    db!.run('INSERT OR REPLACE INTO cache (key, value) VALUES (?, ?)', [key, valueStr], (err: Error | null) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export async function sqliteGetKeyValue(key: string): Promise<any> {
  if (!db) await initDB();

  return new Promise((resolve, reject) => {
    db!.get('SELECT value FROM cache WHERE key = ?', [key], (err: Error | null, row: { value: string } | undefined) => {
      if (err) {
        reject(err);
      } else {
        const value = row ? JSON.parse(row.value) : null;
        resolve(value);
      }
    });
  });
}

// Initialize the database when the module is loaded
initDB().catch(err => console.error("Failed to initialize the database:", err));
