import { IBikeHelp } from '../shared/interfaces';
import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BikeHelpService {

    private url: string = 'http://35.164.244.25:8080/bikehelps/';

    constructor(private http: Http) {
    }

    saveBikeHelp(bikeHelp: IBikeHelp) {
        return this.http.post(this.url, bikeHelp)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getAllBikeHelps() {
        return this.http.get(this.url).map(this.extractData);
    }

    getBikeHelpsByDistance(lat: number, lon: number, range: number) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('range', range.toString());
        params.set('latFrom', lat.toString());
        params.set('lonFrom', lon.toString());

        return this.http.get(this.url+"/distance", {search: params}).map(this.extractData);
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