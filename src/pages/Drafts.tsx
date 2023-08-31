import { IonButton, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import React from 'react';

const Drafts: React.FC = () => {

    return <>
        <IonHeader>
            <IonToolbar color='primary'>
                <IonTitle>Cooking Beluga</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            My drafts
            <IonButton expand='block' color='secondary' href='/new' >
                New Recipe
                <IonIcon slot='start' icon={addOutline} />
            </IonButton>
        </IonContent>
    </>
};

export default Drafts;