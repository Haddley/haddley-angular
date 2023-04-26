import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {CanActivate} from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private auth: Auth, private router: Router){   }
   
    canActivate(){
        if(this.auth.currentUser){
            console.log('AUTH GUARD PASSED');
            return true;
        } else {
            console.log('BLOCKED BY AUTH GUARD');
            this.router.navigate(['/login']);
            return false;
        }
    }
}