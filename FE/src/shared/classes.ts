import { IGroupRoute, IRoute, IUser, IUserLogin } from './interfaces';

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
    constructor(public id: number, public createdById: number, public users: number[], public startPointLon: number, public startPointLat: number, public endPointLon: number, public endPointLat: number, public recurrentOn: any[], public channelId: string) {
        this.id = id;
        this.createdById = createdById;
        this.users = users;
        this.startPointLat = startPointLat;
        this.startPointLon = startPointLon;
        this.endPointLat = endPointLat;
        this.endPointLon = endPointLon;
        this.recurrentOn = recurrentOn;
        this.channelId = channelId;
    }
}