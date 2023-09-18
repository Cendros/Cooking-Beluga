import { IonButton, IonContent, IonHeader, IonIcon, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, RefresherEventDetail, useIonModal } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { getRecipies } from '../services/recipe';
import NewRecipe from './NewRecipe';
import Card from '../components/Recipe/Card';
import { useAtom } from 'jotai';
import { recipiesAtom, selectedRecipeAtom } from '../atoms/recipe';
import { Details } from '../components/Recipe/Details';

const Cook: React.FC = () => {

    const [recipies, setRecipies] = useAtom(recipiesAtom);
    const [selectedRecipe, setSelectedRecipe] = useAtom(selectedRecipeAtom);

    const ModalDetails = ({onDismiss}: {onDismiss: () => void;}) => {
        return (
            <Details recipe={selectedRecipe} onDismiss={onDismiss} />
        )
    }

    const [present, dismiss] = useIonModal(ModalDetails, {
        onDismiss: () => dismiss(),
    });

    useEffect(() => {        
        if (!recipies)
            fetchRecipies();
    }, []);

    useEffect(() => {
        if (!selectedRecipe)
            return;
        present({ onDidDismiss: () => setSelectedRecipe(undefined) });
    }, [selectedRecipe]);

    const fetchRecipies = async () => {        
        const _recipies = await getRecipies();
        setRecipies(_recipies);
    }

    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        await fetchRecipies();
        event.detail.complete();
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
            
            <IonButton expand='block' color='secondary' id='open-new-recipe' className='mb-3'>
                New Recipe
                <IonIcon slot='start' icon={addOutline} />
            </IonButton>

                { recipies?.length ?
                    <>
                        { recipies.map(recipe => (
                            <Card key={recipe.id} recipe={recipe} />
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