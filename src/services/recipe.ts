import { executeQuery } from "../db/db";
import { Recipe, RecipeForm } from "../interfaces/repice";

export const saveRecipe = async ({name, quantity, quantityType, category}: RecipeForm) => {
    const query = `INSERT INTO recipe (name, quantity, quantity_type, category) VALUES ('${name.trim()}', ${quantity}, '${quantityType || 'NULL'}', '${category || 'NULL'}');`;    
    await executeQuery(query);
}

export const editRecipe = async ({name, quantity, quantityType, category}: RecipeForm, id: number) => {
    const query = `UPDATE recipe SET name='${name.trim()}', quantity=${quantity}, quantity_type='${quantityType || 'NULL'}', category='${category || 'NULL'}' WHERE id = ${id};`;    
    await executeQuery(query);
}

export const isExisting = async (name: string, id: number | undefined) => {
    let query = `SELECT id FROM recipe WHERE name = '${name.trim()}'`;
    if (id)
        query += ` AND id != ${id}`;
    const res = await executeQuery(query);
    return res?.values?.length;
}

export const getRecipies = async () => {
    const query = `
        SELECT *
        FROM recipe
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