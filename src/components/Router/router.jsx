import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthenticatedApp } from '../AuthenticatedApp';
import App from '../../App';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthenticatedApp />} />
                <Route path="/room/:id" element={<App />} />
            </Routes>
        </BrowserRouter>
    );
}

export { Router };