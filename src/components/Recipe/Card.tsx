import React from 'react'
import { Recipe } from '../../interfaces/repice';
import { IonButton, IonIcon, IonItem, IonText } from '@ionic/react';
import { closeCircle } from 'ionicons/icons';
import { deleteRecipe as deleteRecipeApi } from '../../services/recipe';
import { useAtom } from 'jotai';
import { recipiesAtom, selectedRecipeAtom } from '../../atoms/recipe';
import { useTranslation } from 'react-i18next';

type CardProps = {
    recipe: Recipe,
}

const Card = ({ recipe }: CardProps) => {

    const [recipies, setRecipies] = useAtom(recipiesAtom);
    const [_selectedRecipe, setSelectedRecipe] = useAtom(selectedRecipeAtom);
    
    const { t } = useTranslation();

    const deleteRecipe = async (id: number) => {
        await deleteRecipeApi(id);
        if (! recipies)
            return;
        
        const _recipies = [...recipies];
        _recipies.splice(_recipies.findIndex(d => d.id === id), 1);
        setRecipies(_recipies);
    }

    const getImagePath = (category: string) => {
        return `assets/images/recipe/${category.toLowerCase().replace(/\s/g, '')}.svg`;
    }

    const showDetails = () => {
        setSelectedRecipe(recipe);
    }

    return (
        <IonItem detail={true} button lines='none' onClick={() => showDetails()} className='mb-3'>
            <div className='grid gap-2 m-0 w-full'>
                <div className='col-3 overflow-hidden p-0 flex justify-content-center align-items-center'>
                    <img src={getImagePath(recipe.category)}  className='full-img border-circle w-full md:w-6 mx-auto'/>
                </div>
                <div className='col flex flex-column justify-content-between gap-2'>
                    <span className='text-xl'>{recipe.name}</span>
                    { recipe.category && <IonText color="medium">{t(`recipe.category.${recipe.category}`)}</IonText> }
                </div>
            </div>
                <IonButton className='border-round' color="danger" onClick={() => deleteRecipe(recipe.id)}>
                    <IonIcon slot='icon-only' icon={closeCircle} />
                </IonButton>
        </IonItem>
    )
}

export default Card;