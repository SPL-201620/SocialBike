import { IRoute } from '../shared/interfaces';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RouteService {

    private url: string = 'http://localhost:8080/routes/';

    constructor(private http: Http) {
    }

    getRoute(routeId: number): Observable<IRoute> {
        return this.http.get(this.url + "/" + routeId).map(this.extractData);
    }

    getRoutesByUserId(userId: number): Observable<IRoute[]> {
        return this.http.get(this.url + "/ByUserId/" + userId).map(this.extractData);
    }

    saveRoute(route: IRoute) {
        return this.http.post(this.url, route)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateRoute(route: IRoute) : Observable<IRoute[]>{
        return this.http.put(this.url + route.id, route)
            .map(this.extractData);
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