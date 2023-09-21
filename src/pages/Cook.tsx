import { IonButton, IonContent, IonHeader, IonIcon, IonMenuToggle, IonPage, IonTitle, IonToolbar, RefresherEventDetail, useIonModal } from '@ionic/react';
import { addOutline, settings } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { getRecipies } from '../services/recipe';
import NewRecipe from '../components/Recipe/NewRecipe';
import Card from '../components/Recipe/Card';
import { useAtom } from 'jotai';
import { recipiesAtom, selectedRecipeAtom } from '../atoms/recipe';
import { Details } from '../components/Recipe/Details';
import { Settings } from '../components/Settings';
import { useTranslation } from 'react-i18next';

const Cook: React.FC = () => {

    const [recipies, setRecipies] = useAtom(recipiesAtom);
    const [selectedRecipe, setSelectedRecipe] = useAtom(selectedRecipeAtom);

    const { t } = useTranslation();

    const ModalDetails = ({onDismiss}: {onDismiss: () => void}) => {
        return (
            <Details recipe={selectedRecipe} dismiss={onDismiss} editRecipe={newRecipePresent} />
        )
    }

    const NewRecipeModal = ({onDismiss}: {onDismiss: () => void}) => {
        return (
            <NewRecipe recipe={selectedRecipe} dismiss={onDismiss} />
        )
    }

    const [present, dismiss] = useIonModal(ModalDetails, {
        onDismiss: () => dismiss()
    });

    const [newRecipePresent, newRecipeDismiss] = useIonModal(NewRecipeModal, {
        onDismiss: () => newRecipeDismiss()
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

    const openNewRecipe = () => {
        newRecipePresent();
    }

    const fetchRecipies = async () => {        
        const _recipies = await getRecipies();
        setRecipies(_recipies);
    }

    return <>
        <Settings />
        <IonPage id='main-content'>
            <IonHeader>
                <IonToolbar color='primary'>
                    <div className='flex flex-row justify-content-between align-items-center mx-4'>
                        <IonTitle className='m-0 p-0 static'>Cooking Beluga</IonTitle>
                        <IonMenuToggle className='align-self-end'>
                            <IonIcon icon={settings} className='text-3xl mt-1' />
                        </IonMenuToggle>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonButton expand='block' color='secondary' className='mb-3' onClick={openNewRecipe}>
                    {t('recipe.newRecipe')}
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
                            <span>{t('recipe.emptyRecipies')}</span>
                        </>
                    }

            </IonContent>
        </IonPage>
    </>
};

export default Cook;