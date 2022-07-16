import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '@service/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const user = await this.auth.getUser();
    const loggedIn = !!user;
    const isEmailVerified = !!user?.emailVerified;

    if (!loggedIn) {
      return this.router.createUrlTree(['session']);
    } else if (loggedIn && !isEmailVerified) {
      throw new Error('Please Verify Your Email');
    } else {
      return loggedIn;
    }
  }
}
