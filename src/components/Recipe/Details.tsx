import React from 'react'
import { Recipe } from '../../interfaces/repice';
import { IonButton, IonContent, IonIcon, IonPage, IonText } from '@ionic/react';
import { arrowBack, pencil } from 'ionicons/icons';

type DetailsProps = {
    recipe: Recipe | undefined
    dismiss: () => void
    editRecipe: () => void
}

export const Details = ({recipe, dismiss, editRecipe}: DetailsProps) => {

    if (!recipe)
        return;

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <div className='flex flex-row justify-content-between'>
                    <IonButton fill='clear' onClick={dismiss}>
                        <IonIcon size='large' icon={arrowBack} />
                    </IonButton>
                    <IonButton fill='clear' onClick={editRecipe}>
                        <IonIcon size='large' icon={pencil} />
                    </IonButton>
                </div>
                <div className='col-5 overflow-hidden p-0 mx-auto mb-5 '>
                    <img src={`assets/images/recipe/${recipe.category.toLowerCase().replace(/\s/g, '')}.svg`}  className='full-img border-circle w-full md:w-6 mx-auto'/>
                </div>
                <IonText color="primary">{recipe.category}</IonText>
                <h1 className='w-8 text-4xl mt-1'>{recipe.name}</h1>
                <span>{recipe.quantity} {recipe.quantityType}</span>
                <h3>Ingredients</h3>
            </IonContent>
        </IonPage>
    )
}