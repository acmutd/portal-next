const auth0_config = {
    domain: process.env.REACT_APP_AUTH0_DOMAIN as string,
    clientId: process.env.REACT_APP_AUTH0_CLIENTID as string,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE as string,
}

export default auth0_config;