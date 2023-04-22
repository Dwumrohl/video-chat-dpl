import { AuthenticatedApp } from './components/AuthenticatedApp';
import { Router } from './components/Router/router';
import { UnauthenticatedApp } from './components/UnauthenticatedApp';
import { useAuth } from './hooks/useAuth';
import './start.css';

function App() {
     const { user } = useAuth();


    // return (
    //     <div className="container">
    //         {user ? <Router /> : <UnauthenticatedApp />}
    //     </div>
    // );
    return (
        <div className="container">
            <Router /> 
        </div>
    );

}

export default App;