import {Routes, Route, HashRouter } from 'react-router-dom';
import { AuthenticatedApp } from '../AuthenticatedApp';
import App from '../../App';

function Router() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<AuthenticatedApp />} />
                <Route path="/room/:id" element={<App />} />
            </Routes>
        </HashRouter>
    );
}

export { Router };