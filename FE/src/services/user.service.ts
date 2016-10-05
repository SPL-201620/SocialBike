import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { IUser } from '../shared/interfaces';

@Injectable()
export class UserService {

    private url: string = 'users/';

    constructor(private http: Http) {
    }

    getUser(userId: number): Observable<IUser> {
        return this.http.get(this.url).map((resp: Response) => resp.json()).catch(this.handleError);
    }

    saveUser(user: IUser){
        return this.http.post(this.url, user)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    updateUser(user: IUser) {
        return this.http.put(this.url + user.id, user)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    handleError(error: any): any {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}