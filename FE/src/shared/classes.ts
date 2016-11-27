import {IBikeHelp, IGroupRoute, IRoute, IUser, IUserLogin, IBike} from './interfaces';

export class User implements IUser {

    constructor(public id: number, public firebaseId: string, public email: string, public password: string, public displayName: string, public pictureUrl: string, public age: number, public sex: string) {
        this.id = id;
        this.firebaseId = firebaseId;
        this.email = email;
        this.password = password;
        this.displayName = displayName;
        this.pictureUrl = pictureUrl;
        this.age = age;
        this.sex = sex;
    }
    
}

export class UserLogin implements IUserLogin {
    constructor(public email: string, public password: string) {
        this.email = email;
        this.password = password;
    }
}

export class Route implements IRoute {
    public id: number;
    public userId: number;
    public startPointLon: number;
    public startPointLat: number;
    public startPointName: string;
    public endPointLon: number;
    public endPointLat: number;
    public endPointName: string;
    public startTime: Date;
    public endTime: Date;
    public speed: number;
    public calories: number;
    public distance: number;
    public finished: boolean;

    constructor() {
    }
}

export class GroupRoute implements IGroupRoute {
    public id: number;
    public name: string;
    public createdById: number;
    public users: number[];
    public route: IRoute;
    public startDate: Date;
    public recurrent: boolean;
    public monday:boolean;
    public tuesday:boolean;
    public wednesday:boolean;
    public thursday:boolean;
    public friday:boolean;
    public saturday:boolean;
    public sunday:boolean;

    constructor(){
    }
}

export class GroupRouteRequest {
    public id: number;
    public name: string;
    public createdById: IUser;
    public users: IUser[];
    public route: IRoute;
    public startDate: Date;
    public recurrent: boolean;
    public monday:boolean;
    public tuesday:boolean;
    public wednesday:boolean;
    public thursday:boolean;
    public friday:boolean;
    public saturday:boolean;
    public sunday:boolean;

    constructor(){
    }
}

export class BikeHelp implements IBikeHelp{
    public id: number;
    public pointLon: number;
    public pointLat: number;
    public name: string;
    public type: string;
    public lowerPrice: number;
    public upperPrice: number;
    public distance: number;
    
    constructor(){

    }
}

export class Bike implements IBike {

	bikeType: string;
	frameType: string;
	wheeleSize: number;
	gearControl: number;
	matchRate: number;
    
    constructor(){
    
    }
}