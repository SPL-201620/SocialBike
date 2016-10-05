import {IRoute} from '../shared/interfaces';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RouteService {

    private url: string = 'routes/';

    constructor(private http: Http) {
    }

    getRoute(routerId: number): Observable<IRoute[]> {
        return this.http.get(this.url + routerId).map((resp: Response) => resp.json()).catch(this.handleError);
    }

    saveRoute(route: IRoute){
        return this.http.post(this.url, route)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    updateRoute(route: IRoute) {
        return this.http.put(this.url + route.id, route)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    handleError(error: any): any {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}