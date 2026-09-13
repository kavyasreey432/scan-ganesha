const Database = require("better-sqlite3");
const path = require("path");

// Database file will be created inside the server folder
const dbPath = path.join(__dirname, "scan-ganesha.db");

const db = new Database(dbPath);

// Create users table
db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        score INTEGER DEFAULT 0,
        time_seconds INTEGER DEFAULT 0,
        moves INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Not Completed',
        final_wish TEXT DEFAULT '',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`).run();


// Add final_wish column to an existing database
try {

    db.prepare(`
        ALTER TABLE users
        ADD COLUMN final_wish TEXT DEFAULT ''
    `).run();

    console.log("✅ final_wish column added.");

} catch (error) {

    // Ignore error if the column already exists
    if (
        !error.message.includes(
            "duplicate column name"
        )
    ) {

        console.error(
            "❌ Database migration error:",
            error
        );

    }
}


console.log("✅ SQLite database is ready.");

module.exports = db;