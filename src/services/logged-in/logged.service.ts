import { Injectable } from "@angular/core";
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { UserAuthService } from './user.service';
import { Router } from '@angular/router';


@Injectable()
export class LoggedInGuard implements CanActivate {
    path;
    route;

    constructor(
        private userService: UserAuthService,
        private router: Router
    ){
    }

    canActivate(){
        if(this.userService.isLogged()){
            return true;
        }else{
            this.router.navigateByUrl('/login');
        }
        return false;
    }
}