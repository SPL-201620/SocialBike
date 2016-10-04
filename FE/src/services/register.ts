import {Injectable} from '@angular/core';  
import {Http, Headers} from '@angular/http';

@Injectable()
export class RegisterService {  
    constructor(private http: Http) {
    }

    getRepos(user) : any {
        let repos = this.http.get(`https://api.github.com/users/${username}/repos`);
        return repos;
    }
}