import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';



@Injectable()
export class ServerService {
    constructor(private http: Http) { }

    storeServers(servers: any) {
        return this.http.put('https://angular-http-5db2e.firebaseio.com/data.json', servers);
    }


    getServers() {
        return this.http.get('https://angular-http-5db2e.firebaseio.com/data.json')
            .pipe(map(
                (res: Response) => {
                    const data = res.json();
                    return data;
                }
            )
            
            
            ).pipe(catchError(error => {
                return Observable.throw("Something went wrong")
            }))
    }

    getAppName() {
        return this.http.get('https://angular-http-5db2e.firebaseio.com/appName.json')
        .pipe(map(
            (res:Response) => {
                return res.json();
            }
        ))
    }

}
