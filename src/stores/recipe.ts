import { create, StateCreator } from 'zustand'
import { Recipe } from '../interfaces/repice'
import { createSelectors } from '../utils/selectors'

interface Recipieslice {
    recipies: Array<Recipe>|undefined
    setRecipies: (recipies: Array<Recipe>|undefined) => void
}
const createRecipieslice: StateCreator<Recipieslice> = (set) => ({
    recipies: undefined,
    setRecipies: (recipies: Array<Recipe>|undefined) => set({ recipies: recipies })
})

const recipeStoreBase = create<Recipieslice>()((...a) => ({
    ...createRecipieslice(...a),
}))

export const recipeStore = createSelectors(recipeStoreBase);