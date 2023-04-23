import {Routes, Route, HashRouter } from 'react-router-dom';
import { AuthenticatedApp } from '../AuthenticatedApp';
import App from '../../App';

function Router() {
    return (
        // <HashRouter>
        //     <Routes>
        //         <Route path="/" element={<AuthenticatedApp />} />
        //         <Route path="/room/:id" element={<App />} />
        //     </Routes>
        // </HashRouter>
        <Switch>
            <Route exact path="/">
            <AuthenticatedApp />
            </Route>
            <Route path="/room/:id">
            <App/>
            </Route>
        </Switch>
    );
}

export { Router };