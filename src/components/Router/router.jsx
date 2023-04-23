import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import { AuthenticatedApp } from '../AuthenticatedApp';
import App from '../../App';

function Router() {
    return (
        <HashRouter>
            <Routes>
                <Route exact path="/room/:id" element={<App />} />
                <Route exact path="/" element={<AuthenticatedApp />} />
            </Routes>
        </HashRouter>
    );
}

export { Router };