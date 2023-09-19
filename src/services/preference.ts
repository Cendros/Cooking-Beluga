import { executeQuery } from "../db/db";

export const getTheme = async () => {
    const query = `SELECT value from preference WHERE key = 'theme';`;    
    const res = await executeQuery(query);
    return res?.values;
}

export const setTheme = async (isDark: boolean) => {
    const query = `INSERT INTO preference (key, value) VALUES ('theme', '${isDark ? 'dark' : 'light'}');`;
    await executeQuery(query);
}

export const changeTheme = async (isDark: boolean) => {
    const query = `UPDATE preference SET value='${isDark ? 'dark' : 'light'}' WHERE key = 'theme';`;
    await executeQuery(query);
}