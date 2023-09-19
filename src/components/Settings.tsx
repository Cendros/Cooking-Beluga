import React, { ChangeEvent, useEffect, useRef } from 'react'
import { useAtomValue } from 'jotai';
import { arrowBack, checkbox, moon, sunny } from 'ionicons/icons'
import { themeToggleAtom } from '../atoms/theme';
import { toggleDarkTheme } from '../utils/theme';
import { IonContent, IonIcon, IonMenu, IonMenuToggle, IonText, IonToggle, ToggleCustomEvent } from '@ionic/react'
import { changeTheme } from '../services/preference';

export const Settings = () => {
    const checkboxTheme = useRef<HTMLInputElement>(null);
    const themeToggle = useAtomValue(themeToggleAtom);

    const toggleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        toggleDarkTheme(e.target.checked);
        await changeTheme(e.target.checked);
    };

    useEffect(() => {
        if (!checkboxTheme.current)
            return;
        checkboxTheme.current.checked = themeToggle;
    }, [themeToggle]);

    return (
        <IonMenu contentId="main-content" side='end'>
            <IonContent className="ion-padding">
                <div className='flex flex-column gap-3'>
                    <IonMenuToggle>
                        <IonIcon size='large' icon={arrowBack} />
                    </IonMenuToggle>
                    <IonText className='align-self-center'><h1 className='m-0'>Settings</h1></IonText>
                    <div className='px-3 mt-3'>
                        <div className='flex flex-row justify-content-between align-items-center'>
                            <span className='text-xl font-bold'>Theme</span>
                            <input type="checkbox" id="switcher-input" className="switcher-input" onChange={toggleChange} ref={checkboxTheme}/>
                            <label className="switcher-label" htmlFor="switcher-input">
                                <IonIcon icon={moon} size='large' />
                                <span className="switcher-toggler"></span>
                                <IonIcon icon={sunny} size='large' />
                            </label>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonMenu>
    )
}
