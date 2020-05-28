import { Injectable } from '@angular/core';
import { CanLoad, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private router: Router,
    private storageService: StorageService,
    private jwthelper: JwtHelperService
  ) { }

  canLoad(route: Route): Observable<boolean> | boolean {
    const globalToken = this.storageService.getData('access_token');
    const payLoad = this.jwthelper.decodeToken(globalToken);
    if (globalToken) {
      const allowedRole = route.data.allowedRole;
      if (payLoad.role === allowedRole) {
        return true;
      }
      this.router.navigateByUrl('/');
    } else if (this.router.url === '/') {
      this.router.navigateByUrl('/');
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }

}
