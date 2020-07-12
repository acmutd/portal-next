import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const HomePage = () => {

    const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

    return (
        <div>
            <h1>LABS PAGE</h1>
            <button onClick={loginWithRedirect}>Click me to sign in</button>
            {isAuthenticated && !isLoading ? <h1>authenticated</h1> : <h1>Not Authenticated</h1>}
        </div>
    );
};

export default HomePage;