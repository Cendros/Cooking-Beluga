import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import React from 'react';
import { flameOutline, newspaperOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router';
import Drafts from '../pages/Drafts';
import Cook from '../pages/Cook';
import { IonReactRouter } from '@ionic/react-router';
import NewRecipe from '../pages/NewRecipe';

const TabBar: React.FC = () => {

    return (
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Redirect exact path='/' to='/cook' />
                    <Route path="/cook" render={_ => <Cook />} exact={true} />
                    <Route path="/drafts" render={_ => <Drafts />} exact={true} />
                    <Route path="/new" render={_ => <NewRecipe />} exact={true} />
                </IonRouterOutlet>

                <IonTabBar slot='bottom'>
                    <IonTabButton tab='cook' href='/cook'>
                        <IonIcon icon={flameOutline} />
                        <IonLabel>Cook</IonLabel>
                    </IonTabButton>
                    
                    <IonTabButton tab='drafts' href='/drafts'>
                        <IonIcon icon={newspaperOutline} />
                        <IonLabel>Drafts</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    );
};

export default TabBar;