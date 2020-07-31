import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

function getBaseApi() {
    return axios.create({
        baseURL: process.env.REACT_APP_ACMAPI_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

function getAuthorizedApi(getAccessTokenSilently: () => Promise<string>): AxiosInstance {
    const api = getBaseApi();
    api.interceptors.request.use(async (config: AxiosRequestConfig) => {
        const token = await getAccessTokenSilently();
        config.headers.Authorization = `Bearer ${token}`
        return config;
    });
    return api;
}

type Authorized<F> =
    F extends (axios: AxiosInstance, ...r: infer R) => Promise<infer O>
        ? (...r: R) => Promise<O>
        : never

export function authorized<F extends (axios: AxiosInstance, ...a: any) => any>(f: F, getAccessTokenSilently: () => Promise<string>): Authorized<F> {
    const authorizedApi = getAuthorizedApi(getAccessTokenSilently);
    return ((...a: any) => f(authorizedApi, ...a)) as Authorized<F>
}