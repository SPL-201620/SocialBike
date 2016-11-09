import { IBikeHelp } from '../shared/interfaces';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BikeHelpService {

    private url: string = 'http://localhost:8080/bikehelp/';

    constructor(private http: Http) {
    }

    saveBikeHelp(bikeHelp: IBikeHelp) {
        return this.http.post(this.url, bikeHelp)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getAllBikeHelps(){
        return this.http.get(this.url).map(this.extractData);
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