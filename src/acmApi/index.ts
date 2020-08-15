import { useAuth0 } from "@auth0/auth0-react";
import { authorized } from "./authHelper";
import { AxiosInstance } from "axios";

interface Result {
    message: string;
    result: any;
}

// TODO: sync with types in portal-backend?
interface roleData {
    permissions?: string[];
}

interface permissionData {
    permission: string;
}

interface divisionData {
    uid?: string;
    email?: string;
    title?: string;
}

type stats = {
    likes: string[];
    rsvp: string[];
    showedUp: number;
    stayed: number;
};

type dates = {
    startTime: string; //Date; //admin.firestore.Timestamp;
    endTime: string; //Date;
};

type address = {
    fullAddress: string;
    fullStreet: string;
    streetNum: string;
    street: string;
    city: string;
    state: string;
    country: string;
};

type location = {
    geo: Geolocation; //admin.firestore.GeoPoint
    address: address;
};

interface event {
    title: string;
    description: string;
    instructions: string[];
    host: number;
    active: boolean;
    dates: dates;
    tags: string[];
    category: string[];
    online: boolean;
    stats: stats;
    location: location;
}

async function createRole(axios: AxiosInstance, role: string, body: roleData): Promise<Result> {
    return (await axios.post<Result>(`/role/${role}`, body)).data;
}

async function updateRole(axios: AxiosInstance, role: string, body: roleData): Promise<Result> {
    return (await axios.put<Result>(`/role/${role}`, body)).data;
}

async function deleteRole(axios: AxiosInstance, role: string): Promise<Result> {
    return (await axios.delete<Result>(`/role/${role}`)).data;
}

async function getRole(axios: AxiosInstance, role: string): Promise<Result> {
    return (await axios.get<Result>(`/role/${role}`)).data;
}

async function getAllRoles(axios: AxiosInstance, role: string): Promise<Result> {
    return (await axios.get<Result>(`/role`)).data;
}

async function addPermission(axios: AxiosInstance, role: string, body: permissionData): Promise<Result> {
    return (await axios.post<Result>(`/role/${role}/addPermission`, body)).data;
}

async function removePermission(axios: AxiosInstance, role: string, body: permissionData): Promise<Result> {
    return (await axios.post<Result>(`/role/${role}/removePermission`, body)).data;
}

async function setStaffMember(axios: AxiosInstance, division: string, body: divisionData): Promise<Result> {
    return (await axios.post<Result>(`/division/${division}`, body)).data
}

async function getAllStaff(axios: AxiosInstance, division: string): Promise<Result> {
    return (await axios.get<Result>(`/division/${division}`)).data;
}

async function createEvent(axios: AxiosInstance, event: string, body: event): Promise<Result> {
    return (await axios.post(`/event/${event}`, body)).data;
}

async function updateEvent(axios: AxiosInstance, event: string, body: event): Promise<Result> {
    return (await axios.put(`/event/${event}`, body)).data;
}

async function deleteEvent(axios: AxiosInstance, event: string): Promise<Result> {
    return (await axios.delete(`/event/${event}`)).data;
}

async function getEvent(axios: AxiosInstance, event: string): Promise<Result> {
    return (await axios.get(`/event/${event}`)).data;
}

export function useAcmApi() {
    const { getAccessTokenSilently } = useAuth0();

    return {
        createRole: authorized(createRole, getAccessTokenSilently),
        updateRole: authorized(updateRole, getAccessTokenSilently),
        deleteRole: authorized(deleteRole, getAccessTokenSilently),
        getRole: authorized(getRole, getAccessTokenSilently),
        getAllRoles: authorized(getAllRoles, getAccessTokenSilently),
        addPermission: authorized(addPermission, getAccessTokenSilently),
        removePermission: authorized(removePermission, getAccessTokenSilently),
        setStaffMember: authorized(setStaffMember, getAccessTokenSilently),
        getAllStaff: authorized(getAllStaff, getAccessTokenSilently),
        createEvent: authorized(createEvent, getAccessTokenSilently),
        updateEvent: authorized(updateEvent, getAccessTokenSilently),
        deleteEvent: authorized(deleteEvent, getAccessTokenSilently),
        getEvent: authorized(getEvent, getAccessTokenSilently),
    };
}