export interface IRoute {
    id: number,
    userId: number;
    startPointLon: number;
    startPointLat: number;
    endPointLon: number;
    endPointLat: number;
}

export interface IUser {
    id: number;
    firebaseId: string;
    email: string;
    password: string;
    displayName: string;
    pictureUrl: string;
    age: number;
    sex: string;
}

export interface IGroupRoute {
    id: number;
    createdById: number;
    users: number[];
    startPointLon: number;
    startPointLat: number;
    endPointLon: number;
    endPointLat: number;
    recurrentOn: any[];
    channelId: string;
}