import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const NewRecipe: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color='primary'>
                    <IonTitle>Cooking Beluga</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonCard>
                    <IonCardHeader color={'tertiary'} className='ion-margin-bottom'>
                        <IonCardTitle>New recipe</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonInput label='Name' labelPlacement='floating' placeholder='Recipe name' fill='outline' />
                    </IonCardContent>
                    <div className='flex justify-content-end'>
                        <IonButton fill='clear' color={'danger'} href='/drafts'>Cancel</IonButton>
                        <IonButton fill='clear' color={'success'}>Save</IonButton>
                    </div>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default NewRecipe;