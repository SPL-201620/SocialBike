import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AchievementService {

    private url: string = 'http://localhost:8080/achievements/';

    constructor(private http: Http) {
    }

    getUserAchievements(userId: number) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('userId', userId.toString());

        return this.http.get(this.url, { search: params }).map(this.extractData);
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