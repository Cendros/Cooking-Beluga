import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { defineCustomElements as jeepSqlite, applyPolyfills, JSX as LocalJSX  } from "jeep-sqlite/loader";

applyPolyfills().then(() => {
    jeepSqlite(window);
});
window.addEventListener('DOMContentLoaded', async _ => {
    const container = document.getElementById('root');
    const root = createRoot(container!);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
})