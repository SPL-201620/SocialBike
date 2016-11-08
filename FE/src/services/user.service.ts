import { UserLogin } from '../shared/classes';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { IUser } from '../shared/interfaces';

import { AngularFire } from 'angularfire2';

import { Storage } from '@ionic/storage';

@Injectable()
export class UserService {

    private url: string = 'http://localhost:8080/users/';

    constructor(private http: Http, public af: AngularFire, public storage: Storage) {
    }

    getCurrentFirebaseUserId() {
        return this.storage.get('userId')
            .then(value => {
                return value;
            });
    }

    getCurrentDBUserId() {
        return this.storage.get('userDBId')
            .then(value => {
                return value;
            });
    }

    logUserIn(email: string, password: string) {
        let userLogin = new UserLogin(email, password);
        return this.http.post(this.url + "login/", userLogin)
            .map(this.extractData)
            .catch(this.handleError);
    }

    loginFirebaseAuth(email: string, password: string) {
        var creds: any = { email: email, password: password };
        var res: Promise<boolean> = new Promise((resolve, reject) => {
            this.af.auth.login(creds, 4).then(result => {
                console.log(result);
                resolve(result);
            })
        });
        return res;
    }

    getAllUsers(): Observable<IUser[]> {
        return this.http.get(this.url).map(this.extractData);
    }

    getUser(userId: number): Observable<IUser> {
        return this.http.get(this.url + "/" + userId).map(this.extractData);
    }

    getUserByFirebaseId(userId: number): Observable<IUser> {
        return this.http.get(this.url + "/findUserByFirebaseId/" + userId).map(this.extractData);
    }

    saveUserFirebase(email: string, password: string) {
        var creds: any = { email: email, password: password };
        return this.af.auth.createUser(creds);
    }

    saveUser(user: IUser) {
        return this.http.post(this.url, user)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateUser(user: IUser) {
        return this.http.put(this.url + user.id, user)
            .map(this.extractData)
            .catch(this.handleError);
    }

    handleError(error: any): any {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }

    addUserFriend(uid:string, friendUid: string){
        let endpoint = this.af.database.object(`/users/${uid}/friends/${friendUid}`);
        endpoint.set(true);
    }

    getUserFriends() : any{
        return this.getCurrentFirebaseUserId().then(uid => {
            let friends = this.af.database.list(`/users/${uid}/friends`);
            return friends;
        });
    }

    private extractData(res: Response) {
        let body;

        // check if empty, before call json
        if (res.text()) {
            body = res.json();
        }

        return body || {};
    }
}