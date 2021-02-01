import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

const BASE_URL = process.env.NODE_ENV === "production" ? process.env.REACT_APP_PRODUCTION_URL : process.env.REACT_APP_LOCAL_URL

function getBaseApi(): AxiosInstance {
    return axios.create({
        baseURL: BASE_URL,
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

type Authorized<Function> =
    Function extends (axios: AxiosInstance, ...params: infer Params) => Promise<infer Output>
        ? (...params: Params) => Promise<Output>
        : never

export function authorized<F extends (axios: AxiosInstance, ...a: any) => Promise<any>>(f: F, getAccessTokenSilently: () => Promise<string>): Authorized<F> {
    const authorizedApi = getAuthorizedApi(getAccessTokenSilently);
    return ((...a: any) => f(authorizedApi, ...a)) as Authorized<F>
}