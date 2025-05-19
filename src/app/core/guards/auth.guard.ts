import { Injectable } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';

/**
 * AuthGuard protects routes by checking if the user is authenticated using RxJS.
 * Redirects unauthenticated users to the /auth route with a returnUrl query parameter.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private userService: UserService, private router: Router) {}

  /**
   * Determines if a route can be activated based on authentication status
   * @param route The activated route snapshot
   * @param state The router state snapshot
   * @returns Observable<boolean> or redirects to /auth
   */
  canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return this.userService.user$.pipe(
      map(user => {
        if (user.isLoggedIn) {
          return true;
        }
        this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
        return false;
      })
    );
  };
}