import { IonRouterOutlet } from "@ionic/react"
import { Route } from "react-router"
import Cook from "../pages/Cook"
import { IonReactRouter } from '@ionic/react-router';


const Router = () => {
    return (
        <IonReactRouter>
            <IonRouterOutlet>
                <Route path="/" render={_ => <Cook />} exact={true} />
            </IonRouterOutlet>
        </IonReactRouter>
    )
}

export default Router;