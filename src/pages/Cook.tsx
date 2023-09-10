import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, RefresherEventDetail } from '@ionic/react';
import { addOutline, closeCircle, refreshCircle, refreshCircleOutline } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { Recipe } from '../interfaces/repice';
import { recipeStore } from '../stores/recipe';
import { deleteRecipe as deleteRecipeApi, getRecipies } from '../services/recipe';
import NewRecipe from './NewRecipe';

const Cook: React.FC = () => {

    const recipies = recipeStore.use.recipies();
    const setRecipies = recipeStore.use.setRecipies();

    useEffect(() => {
        console.log(recipies);
        
        if (!recipies)
            fetchRecipies();
    }, []);

    const fetchRecipies = async () => {        
        const _recipies = await getRecipies();
        setRecipies(_recipies);
    }

    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        await fetchRecipies();
        event.detail.complete();
    }

    const deleteRecipe = async (id: number) => {
        await deleteRecipeApi(id);
        if (! recipies)
            return;
        
        const _recipies = [...recipies];
        _recipies.splice(_recipies.findIndex(d => d.id === id), 1);
        setRecipies(_recipies);
    }

    return <>
        <IonHeader>
            <IonToolbar color='primary'>
                <IonTitle>Cooking Beluga</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <IonRefresher slot='fixed' onIonRefresh={handleRefresh}>
                <IonRefresherContent>
                </IonRefresherContent>
            </IonRefresher>
            
            My recipies
            <IonButton expand='block' color='secondary' id='open-new-recipe' >
                New Recipe
                <IonIcon slot='start' icon={addOutline} />
            </IonButton>
            <IonButton expand='block' color='light' onClick={fetchRecipies} >
                Refresh
                <IonIcon slot='start' icon={refreshCircleOutline} />
            </IonButton>

                { recipies?.length ?
                    <>
                        { recipies.map(recipe => (
                            <IonCard key={recipe.id}>
                                <IonCardHeader>
                                    <div className='flex flex-row justify-content-between align-items-center'>
                                        <IonCardTitle>{recipe.name}</IonCardTitle>
                                        <IonButton className='border-round' color="danger" onClick={() => deleteRecipe(recipe.id)}>
                                            <IonIcon slot='icon-only' icon={closeCircle} />
                                        </IonButton>
                                    </div>
                                </IonCardHeader>
                            </IonCard>
                        ))}
                    </>
                :
                    <>
                        <span>You don't have any recipies.</span>
                    </>
                }

            <NewRecipe />
        </IonContent>
    </>
};

export default Cook;