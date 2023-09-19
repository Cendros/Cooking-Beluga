import { executeQuery } from "../db/db";

export const getTheme = async () => {
    const query = `SELECT value FROM preference WHERE key = 'theme';`;
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

export const getLanguage = async () => {
    const query = `SELECT value FROM preference WHERE key = 'language';`;
    const res = await executeQuery(query);
    return res?.values;
}

export const setLanguage = async (language: string) => {
    const query = `INSERT INTO preference (key, value) VALUES ('language', '${language}');`;
    await executeQuery(query);
}

export const changeLanguage = async (language: string) => {
    const query = `UPDATE preference SET value='${language}' WHERE key = 'language';`;
    await executeQuery(query);
}