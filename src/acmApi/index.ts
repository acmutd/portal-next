import { useAuth0 } from "@auth0/auth0-react";
import { authorized } from "./authHelper";
import { AxiosInstance } from "axios";

interface Result {
    message: string;
    result: string;
}

// TODO: sync with types in portal-backend?
interface roleData {
    permissions?: string[];
}

async function createRole(axios: AxiosInstance, role: string, body: roleData): Promise<Result> {
    return (await axios.post<Result>(`/createRole/${role}`)).data;
}

async function updateRole(axios: AxiosInstance, role: string, body: roleData): Promise<Result> {
    return (await axios.put<Result>(`/updateRole/${role}`)).data;
}

async function deleteRole(axios: AxiosInstance, role: string): Promise<Result> {
    return (await axios.delete<Result>(`/deleteRole/${role}`)).data;
}

export function useAcmApi() {
    const { getAccessTokenSilently } = useAuth0();

    return {
        createRole: authorized(createRole, getAccessTokenSilently),
        updateRole: authorized(updateRole, getAccessTokenSilently)
    };
}