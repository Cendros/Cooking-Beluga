import { Capacitor } from '@capacitor/core';
import { SQLiteConnection, CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { JeepSqlite } from 'jeep-sqlite/dist/components/jeep-sqlite';

const createTables = `
    PRAGMA user_version = 2;

    CREATE TABLE IF NOT EXISTS recipe (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT UNIQUE NOT NULL,
        quantity INTEGER,
        quantity_type TEXT,
        category TEXT,
        last_modified INTEGER DEFAULT (strftime('%s', 'now')),
        sql_deleted BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))
    );

    CREATE TABLE IF NOT EXISTS ingredient (
        id INTEGER PRIMARY KEY NOT NULL,
        recipe_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        quantity REAL NOT NULL,
        quantity_type TEXT NOT NULL,
        sql_deleted BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1)),
        FOREIGN KEY (recipe_id) REFERENCES recipe(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS preference (
        id INTEGER PRIMARY KEY NOT NULL,
        key TEXT NOT NULL,
        value TEXT NOT NULL,
        sql_deleted BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))
    );

    CREATE INDEX IF NOT EXISTS recipe_index_name ON recipe (name);
    CREATE INDEX IF NOT EXISTS ingredient_index_name ON ingredient (name);

    CREATE TRIGGER IF NOT EXISTS recipe_trigger_last_modified 
    AFTER UPDATE ON recipe
    FOR EACH ROW WHEN NEW.last_modified <= OLD.last_modified  
    BEGIN  
        UPDATE recipe SET last_modified= (strftime('%s', 'now')) WHERE id=OLD.id;   
    END;
`;

export const initDb = async () => {
    const platform = Capacitor.getPlatform();
    
    const sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
    try {
        if (platform === 'web') {
            customElements.define('jeep-sqlite', JeepSqlite);
            const jeepEl = document.createElement('jeep-sqlite');
            document.body.appendChild(jeepEl);
            await customElements.whenDefined('jeep-sqlite');
            await sqlite.initWebStore();
        }

        const ret = await sqlite.checkConnectionsConsistency();
        const isConn = (await sqlite.isConnection('cooking_beluga', false)).result;
        
        let db: SQLiteDBConnection;
        if (ret.result && isConn)
            db = await sqlite.retrieveConnection('cooking_beluga', false);
        else db = await sqlite.createConnection('cooking_beluga', false, 'no-encryption', 1, false);

        await db.open();

        await db.execute(createTables);
        if (platform === 'web')
            await sqlite.saveToStore('cooking_beluga');
    } catch (err) {
        console.error(err);
    }
}