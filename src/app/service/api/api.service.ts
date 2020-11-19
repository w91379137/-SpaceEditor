import { Injectable } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface ServerResponds {
  success: boolean;
  result: any;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor(
    private http: HttpClient,
  ) { }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  // 共用
  public async convenientReq(
    path: string,
    body: any,
    host: string,
  ): Promise<ServerResponds> {
    // debug(`api path: %o body: %o`, path, body);
    // console.log('api', path);

    const res = await this.http.post(host + path, body).pipe(timeout(3000))
      .toPromise()
      .catch(this.handleError);

    return res;
  }

  private handleError(error: any): Promise<any> {
    // debug('An error occurred', error);
    // console.log(error);
    return Promise.resolve({ success: false, result: undefined, error: error.message || error });
  }
}
