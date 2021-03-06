export interface IRoute {
    id: number,
    userId: number;
    startPointName: string;
    startPointLon: number;
    startPointLat: number;
    endPointName: string;
    endPointLon: number;
    endPointLat: number;
    startTime: Date;
    endTime: Date;
    speed: number;
    calories: number;
    distance: number;
    finished: boolean;
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

export interface IUserLogin{
    email: string,
    password: string
}

export interface IGroupRoute {
    id: number;
    name: string;
    createdById: number;
    users: number[];
    route: IRoute;
    startDate: Date;
    recurrent: boolean;
    monday:boolean;
    tuesday:boolean;
    wednesday:boolean;
    thursday:boolean;
    friday:boolean;
    saturday:boolean;
    sunday:boolean;
}

export interface IBikeHelp {
    id: number;
    pointLon: number;
    pointLat: number;
    name: string;
    type: string;
    lowerPrice: number;
    upperPrice: number;
    distance: number;
}

export interface IBike {

	bikeType: string;
	frameType: string;
	wheeleSize: number;
	gearControl: number;
	matchRate: number;
}

export interface IUserAchievement { 
    name: string;
    value: number;
    valueToUnlock: number;
    unlocked: boolean;
}