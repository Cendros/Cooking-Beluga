export interface Recipe {
    id: number,
    name: string,
    quantity: number,
    quantityType: string,
    lastUpdate: string,
    isRecipe: boolean
}

export interface RecipeForm {
    name: string,
    quantity: number,
    quantityType: string
}