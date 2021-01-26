import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {TokenStorageService} from '../service/token-storage/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RegGuard implements CanActivate, CanActivateChild {
  constructor(private tokenStorageService: TokenStorageService, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

  if (this.tokenStorageService.getPerson() && this.tokenStorageService.getPerson().roles.includes('ROLE_ADMIN')) {
    return of(true);
  } else {
    alert('Only admin');
    this.router.navigate(['/lk']);
    return  of(false);
  }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
  return this.canActivate(route, state);
  }
}
