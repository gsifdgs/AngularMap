import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface LoginResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class LoginService {

    constructor(private router: Router, private httpClient: HttpClient) { }
    loggedIn = false;
    signup(email: string, password: string) {

    }
    async isAuthenticated() {
        try {
            const res = await this.httpClient.get(`${environment.apiurl}checkauthentication`, { withCredentials: true }).toPromise()
            console.log('isAuthenticated res', res)
            return true
        } catch (error) {
            console.log('isAuthenticated error', error)
            return false
        }
    }
    async login(email: string, password: string) {		//giriş yaptıysa true, yapmadıysa false döndür
        const payload = {
            email: email,
            password: password
        }
        const url = `${environment.apiurl}user`;
        try {
            const loginResult = await this.httpClient.post(url, payload, { withCredentials: true }).toPromise();
            this.loggedIn = true;
            this.router.navigate(['/'])

        } catch (error) {

        }
    }
    logout() {
        this.router.navigate(['/login'])
        this.loggedIn = false;
    }

}
