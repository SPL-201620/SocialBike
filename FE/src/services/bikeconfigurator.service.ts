import { IBike } from '../shared/interfaces';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BikeConfiguratorService {

    private url: string = 'http://localhost:8080/bikeconfigurator/';

    constructor(private http: Http) {
    }

    validateBikeConf(selectedBike: IBike) {
        return this.http.post(this.url, selectedBike)
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