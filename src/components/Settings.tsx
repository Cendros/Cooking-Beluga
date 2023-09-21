import React, { ChangeEvent, useEffect, useRef } from 'react'
import { useAtomValue } from 'jotai';
import { arrowBack, moon, sunny } from 'ionicons/icons'
import { themeToggleAtom } from '../atoms/preference';
import { toggleDarkTheme } from '../utils/theme';
import { IonContent, IonIcon, IonMenu, IonMenuToggle, IonSelect, IonSelectOption, IonText } from '@ionic/react'
import { changeLanguage, changeTheme } from '../services/preference';
import { useTranslation } from 'react-i18next';

export const Settings = () => {
    const checkboxTheme = useRef<HTMLInputElement>(null);
    const themeToggle = useAtomValue(themeToggleAtom);

    const { t, i18n } = useTranslation();

    const lngs = ['en', 'fr'];

    useEffect(() => {
        if (!checkboxTheme.current)
            return;
        checkboxTheme.current.checked = themeToggle;
    }, [themeToggle]);

    const toggleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        toggleDarkTheme(e.target.checked);
        await changeTheme(e.target.checked);
    };

    const onLanguageChange = async (e: CustomEvent) => {
        i18n.changeLanguage(e.detail.value);
        await changeLanguage(e.detail.value)
    }

    return (
        <IonMenu contentId="main-content" side='end'>
            <IonContent className="ion-padding">
                <div className='flex flex-column gap-3'>
                    <IonMenuToggle>
                        <IonIcon size='large' icon={arrowBack} />
                    </IonMenuToggle>
                    <IonText className='align-self-center'><h1 className='m-0'>{t('settings.title')}</h1></IonText>
                    <div className='flex flex-column gap-3 px-3 mt-3'>
                        <div className='flex flex-row justify-content-between align-items-center'>
                            <span className='text-xl font-bold'>{t('settings.theme')}</span>
                            <input type="checkbox" id="switcher-input" className="switcher-input" onChange={toggleChange} ref={checkboxTheme}/>
                            <label className="switcher-label" htmlFor="switcher-input">
                                <IonIcon icon={moon} size='large' />
                                <span className="switcher-toggler"></span>
                                <IonIcon icon={sunny} size='large' />
                            </label>
                        </div>
                        <div className='grid align-items-center'>
                            <span className='col-6 text-xl font-bold'>{t('settings.language')}</span>
                            <IonSelect value={i18n.language} labelPlacement='fixed' onIonChange={onLanguageChange} class='col'>
                                { lngs.map((l, i) => (
                                    <IonSelectOption key={i} value={l}>
                                        {t(`settings.${l}`)}
                                    </IonSelectOption>
                                )) }
                            </IonSelect>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonMenu>
    )
}
