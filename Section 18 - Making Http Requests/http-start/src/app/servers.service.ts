import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class ServerService {
    constructor(private http: Http) {}

    storeServers(servers:any) {
        return this.http.put('https://angular-http-5db2e.firebaseio.com/data.json',servers);
    }

    
    getServers() {
        return this.http.get('https://angular-http-5db2e.firebaseio.com/data.json')
    }

}
