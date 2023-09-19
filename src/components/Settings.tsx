import React from 'react'
import { useAtomValue } from 'jotai';
import { arrowBack } from 'ionicons/icons'
import { themeToggleAtom } from '../atoms/theme';
import { toggleDarkTheme } from '../utils/theme';
import { IonContent, IonIcon, IonMenu, IonMenuToggle, IonText, IonToggle, ToggleCustomEvent } from '@ionic/react'
import { changeTheme } from '../services/preference';

export const Settings = () => {
    const themeToggle = useAtomValue(themeToggleAtom);

    const toggleChange = async (ev: ToggleCustomEvent) => {
        toggleDarkTheme(ev.detail.checked);
        await changeTheme(ev.detail.checked);
    };

    return (
        <IonMenu contentId="main-content" side='end'>
            <IonContent className="ion-padding">
                <div className='flex flex-column gap-3'>
                    <IonMenuToggle>
                        <IonIcon size='large' icon={arrowBack} />
                    </IonMenuToggle>
                    <IonText className='align-self-center'><h1 className='m-0'>Settings</h1></IonText>
                    <IonToggle checked={themeToggle} onIonChange={toggleChange} labelPlacement='start'>Theme</IonToggle>
                </div>
            </IonContent>
        </IonMenu>
    )
}
