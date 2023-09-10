import { SQLiteDBConnection } from "react-sqlite-hook";
import { existingConn, sqlite } from "../App"

export const executeQuery = async (query: string) => {
    console.log(query);
    
    try {
        const platform = (await sqlite.getPlatform()).platform;
        let db: SQLiteDBConnection;
        const isConn = (await sqlite.isConnection('cooking_beluga')).result;
        if (isConn)
            db = await sqlite.retrieveConnection('cooking_beluga', false);
        else {
            db = await sqlite.createConnection('cooking_beluga', false, 'no-encryption', 1);
            existingConn.setExistConn(true);
        }
        await db.open();
        console.log(query);
        
        const res = await db.query(query);
        console.log(res);

        if (platform === 'web')
            await sqlite.saveToStore('cooking_beluga');
        return res;
    } catch (error) {
        console.error(error);
    }
}