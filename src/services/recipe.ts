import { executeQuery } from "../db/db";

export const saveRecipe = async (name: string, quantity: number|null = null, quantityType: string|null = null) => {
    const query = `INSERT INTO recipe (name, quantity, quantity_type) VALUES ('${name.trim()}', ${quantity}, '${quantityType || 'NULL'}');`;    
    await executeQuery(query);
}

export const isExisting = async (name: string) => {
    const query = `SELECT id FROM recipe WHERE name = '${name.trim()}'`;
    const res = await executeQuery(query);
    return res?.values?.length;
}

export const getRecipies = async () => {
    const query = `
        SELECT *
        FROM recipe
        WHERE is_recipe = 1
        ORDER BY name ASC;
    `;

    const res = await executeQuery(query);
    if (res)
        return res?.values;
}

export const deleteRecipe = async (id: number) => {    
    const query = `
        DELETE FROM recipe
        WHERE id = ${id}
    `;

    const res = await executeQuery(query);
    if (res)
        return res?.values;
}