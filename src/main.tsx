import React, { HTMLAttributes } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { JSX as LocalJSX  } from "jeep-sqlite/loader";
import { initDb } from './db/init';

import './translations/i18n'


type StencilToReact<T> = {
    [P in keyof T]?: T[P] & Omit<HTMLAttributes<Element>, 'className'> & {
        class?: string;
    };
} ;

declare global {
    export namespace JSX {
        interface IntrinsicElements extends StencilToReact<LocalJSX.IntrinsicElements> {
        }
    }
}

window.addEventListener('DOMContentLoaded', async _ => {
    
    await initDb();

    const container = document.getElementById('root');
    const root = createRoot(container!);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
})