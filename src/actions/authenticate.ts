export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export interface authInterface {
    type: typeof LOGIN | typeof LOGOUT
}

export const loginAction = (): authInterface => {
    return {
        type: LOGIN
    }
}

export const logoutAction = (): authInterface => {
    return {
        type: LOGOUT
    }
}