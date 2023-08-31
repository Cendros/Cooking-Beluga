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
import 'primeflex/primeflex.min.css'

import TabBar from './components/TabBar';
import { useState } from 'react';

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
    existingConn = {existConn: existConn, setExistConn: setExistConn};

    sqlite = useSQLite();
    
    return (
        <IonApp>
            <TabBar />
        </IonApp>
    );
}
export default App;