import { IonApp, setupIonicReact } from '@ionic/react';
import { SQLiteHook, useSQLite } from 'react-sqlite-hook';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/item.css'
import './theme/utilities.css'
import './theme/toggler.css'
import 'primeflex/primeflex.min.css'

import { useEffect, useState } from 'react';
import Router from './components/Router';
import { toggleDarkTheme } from './utils/theme';
import { useAtom } from 'jotai';
import { themeToggleAtom } from './atoms/preference';
import { getLanguage, getTheme, setLanguage, setTheme } from './services/preference';
import { useTranslation } from 'react-i18next';

interface JsonListenerInterface {
    jsonListeners: boolean,
    setJsonListeners: React.Dispatch<React.SetStateAction<boolean>>,
}
interface existingConnInterface {
    existConn: boolean,
    setExistConn: React.Dispatch<React.SetStateAction<boolean>>,
}

export let sqlite: SQLiteHook;
export let existingConn: existingConnInterface;
export let isJsonListeners: JsonListenerInterface;

setupIonicReact();

const App: React.FC = _ => {

    const [existConn, setExistConn] = useState(false);

    const [_themeToggle, setThemeToggle] = useAtom(themeToggleAtom);

    const { i18n } = useTranslation();
    
    sqlite = useSQLite();

    const initializeDarkTheme = (isDark: boolean) => {
        setThemeToggle(isDark);
        toggleDarkTheme(isDark);
    };

    useEffect(() => {
        initTheme();
        initLanguage();
    }, []);

    const initTheme = async () => {
        const theme = await getTheme();
        if (!theme?.length) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
            initializeDarkTheme(prefersDark.matches);
            await setTheme(prefersDark.matches)
        } else initializeDarkTheme(theme[0].value === 'dark');
    }

    const initLanguage = async () => {
        const language = await getLanguage();
        console.log(language);
        
        if (!language?.length) {
            await setLanguage(i18n.language);
        } else i18n.changeLanguage(language[0].value);
    }

    existingConn = {existConn: existConn, setExistConn: setExistConn};


    
    return (
        <IonApp>
            <Router />
        </IonApp>
    );
}
export default App;