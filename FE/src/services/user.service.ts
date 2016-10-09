import { User, UserLogin } from '../shared/classes';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { IUser } from '../shared/interfaces';

@Injectable()
export class UserService {

    private url: string = 'http://localhost:8080/users/';

    constructor(private http: Http) {
    }

    logUserIn(email: string, password: string) {
        let userLogin = new UserLogin(email, password);
        return this.http.post(this.url + "login/", userLogin)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getUser(userId: number): Observable<IUser> {
        return this.http.get(this.url).map(this.extractData);
    }

    saveUser(user: IUser) {
        user.firebaseId = "testing";
        user.pictureUrl = "testing";
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

    private extractData(res: Response) {
        let body;

        // check if empty, before call json
        if (res.text()) {
            body = res.json();
        }

        return body || {};
    }
}