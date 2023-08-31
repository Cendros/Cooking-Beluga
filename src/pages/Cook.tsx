import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { add } from 'ionicons/icons';
import React from 'react';
import TabBar from '../components/TabBar';

const Cook: React.FC = _ => {

    return <>
        <IonHeader>
            <IonToolbar color='primary'>
                <IonTitle>Cooking Beluga</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            My recipies
        </IonContent>
    </>
};

export default Cook;