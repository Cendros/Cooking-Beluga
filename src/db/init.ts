import { Capacitor } from '@capacitor/core';
import { SQLiteConnection } from '@capacitor-community/sqlite';
import { CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';

export const initDb = async () => {
    const platform = Capacitor.getPlatform();
    const sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
    try {
        if (platform === 'web') {
            const jeepEl = document.createElement('jeep-sqlite');
            document.body.appendChild(jeepEl);
            await customElements.whenDefined('jeep-sqlite');
            await sqlite.initWebStore();
        }
        const ret = await sqlite.checkConnectionsConsistency();
        const isConn = (await sqlite.isConnection('cooking_beluga', false)).result;
        let db;
        if (ret.result && isConn)
            db = await sqlite.retrieveConnection('cooking_beluga', false);
        else db = await sqlite.createConnection('cooking_beluga', false, 'no-encryption', 1, false);

        await db.open();
        let query = `
            CREATE TABLE IF NOT EXISTS recipe (
                id INTEGER PRIMARY KEY NOT NULL,
                name TEXT NOT NULL
            );
        `;

        const res = await db.execute(query);
        await db.close();
        await sqlite.closeConnection("db_issue9", false);
    } catch (err) {
        console.error(err);
        throw new Error(`Error: ${err}`);
    }
}