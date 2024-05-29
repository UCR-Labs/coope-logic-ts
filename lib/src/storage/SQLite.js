"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqliteGetKeyValue = exports.sqliteSetKeyValue = void 0;
const sqlite_1 = require("sqlite");
const sqlite3_1 = __importDefault(require("sqlite3"));
// Database instance
let db = null;
// Initialize the database
async function initDB() {
    db = await (0, sqlite_1.open)({
        filename: './database.db',
        driver: sqlite3_1.default.Database,
    });
    await db.run('CREATE TABLE IF NOT EXISTS cache (key TEXT PRIMARY KEY, value TEXT)');
}
async function sqliteSetKeyValue(key, value) {
    if (!db)
        await initDB();
    return new Promise((resolve, reject) => {
        if (!key || value === undefined) {
            return reject(new Error("Invalid key or value"));
        }
        const valueStr = JSON.stringify(value);
        db.run('INSERT OR REPLACE INTO cache (key, value) VALUES (?, ?)', [key, valueStr], (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
exports.sqliteSetKeyValue = sqliteSetKeyValue;
async function sqliteGetKeyValue(key) {
    if (!db)
        await initDB();
    return new Promise((resolve, reject) => {
        db.get('SELECT value FROM cache WHERE key = ?', [key], (err, row) => {
            if (err) {
                reject(err);
            }
            else {
                const value = row ? JSON.parse(row.value) : null;
                resolve(value);
            }
        });
    });
}
exports.sqliteGetKeyValue = sqliteGetKeyValue;
// Initialize the database when the module is loaded
initDB().catch(err => console.error("Failed to initialize the database:", err));
//# sourceMappingURL=SQLite.js.map