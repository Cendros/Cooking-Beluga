import { atom } from "jotai";
import { Recipe } from "../interfaces/repice";

export const recipiesAtom = atom<Array<Recipe> | undefined>(undefined);

export const selectedRecipeAtom = atom<Recipe | undefined>(undefined);