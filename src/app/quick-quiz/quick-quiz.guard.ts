import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { QuickQuizService } from '../service/quick-quiz/quick-quiz.service';

@Injectable()
export class QuickQuizGuard implements CanActivate {
  constructor(
    private router: Router,
    private quickQuizService: QuickQuizService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): true | UrlTree {
    const sessionToken = this.quickQuizService.sessionToken;
    const token = sessionToken?.token;
    const quizOption = this.quickQuizService.getQuizSettings();
    return this.checkToken(token, quizOption);
  }

  checkToken(token: any, quizOption: any): true | UrlTree {
    if (token && quizOption) {
      return true;
    } else {
      console.log(`token: ${token}, option ${quizOption}`);
      return this.router.createUrlTree(['quick-quiz']);
    }
  }
}
