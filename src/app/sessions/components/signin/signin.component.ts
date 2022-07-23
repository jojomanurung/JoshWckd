import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@service/auth/auth.service';
import { LoadingService } from '@service/loading/loading.service';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  nextUrl!: string | null;

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.nextUrl = this.route.snapshot.queryParamMap.get('next');
  }

  async signIn() {
    if (this.signForm.invalid) {
      this.signForm.markAllAsTouched();
      return;
    }
    this.loadingService.loadingOn();
    const email = this.signForm.get('email')?.value;
    const password = this.signForm.get('password')?.value;
    await this.authService.emailSignIn(email, password);
    this.loadingService.loadingOff();
    if (this.nextUrl) {
      this.router.navigate([this.nextUrl]);
    } else {
      this.router.navigate(['/']);
    }
  }

  async googleSignIn() {
    this.loadingService.loadingOn();
    await this.authService.googleSignIn();
    this.loadingService.loadingOff();
    if (this.nextUrl) {
      this.router.navigate([this.nextUrl]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
