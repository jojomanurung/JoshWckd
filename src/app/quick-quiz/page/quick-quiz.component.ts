import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from '@service/loading/loading.service';
import { NavService } from '@service/nav/nav.service';
import { QuickQuizService } from '@service/quick-quiz/quick-quiz.service';
import * as moment from 'moment';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-quick-quiz',
  templateUrl: './quick-quiz.component.html',
  styleUrls: ['./quick-quiz.component.scss'],
})
export class QuickQuizComponent implements OnInit, OnDestroy {
  myInnerHeight: any;
  private subs = new SubSink();
  quizOption!: FormGroup;
  category!: any[];
  difficulty = [
    {
      value: 'easy',
      key: 'Easy',
    },
    {
      value: 'medium',
      key: 'Medium',
    },
    {
      value: 'hard',
      key: 'Hard',
    },
  ];

  constructor(
    private navService: NavService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private quickQuizService: QuickQuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.navService.setPageTitle('Quick Quiz');
    this.checkToken();
    this.initForm();
    this.getCategory();
  }

  getAutomaticHeight() {
    const innerWidth = window.innerWidth;
    const navHeight = innerWidth <= 599 ? 56 : 64;
    this.myInnerHeight = window.innerHeight - navHeight;
    return this.myInnerHeight;
  }

  checkToken() {
    const currentDate = moment().utc().format('DD/MM/YYYY HH:mm');
    const sessionToken = this.quickQuizService.sessionToken;
    const expirationDate = sessionToken?.expiresAt;
    if (sessionToken) {
      if (currentDate < expirationDate) {
        return;
      } else {
        sessionStorage.removeItem('quizSession');
        console.log('session expired');
        this.getToken();
      }
    } else {
      this.getToken();
    }
  }

  getToken() {
    this.subs.sink = this.quickQuizService.getToken().subscribe((resp) => {
      const expires = moment().utc().add(2, 'h').format('DD/MM/YYYY HH:mm');
      const sessionObject = {
        expiresAt: expires,
        token: resp,
      };
      sessionStorage.setItem('quizSession', JSON.stringify(sessionObject));
    });
  }

  initForm() {
    this.quizOption = this.fb.group({
      category: ['', Validators.required],
      difficulty: ['', Validators.required],
    });
  }

  getCategory() {
    this.loadingService.loadingOn();
    this.subs.sink = this.quickQuizService.getCategory().subscribe((resp) => {
      if (resp) {
        this.loadingService.loadingOff();
        this.category = resp;
      }
    });
  }

  onSubmit() {
    if (!this.checkFormValidity()) {
      return;
    }
    const data = this.quizOption.value;
    this.quickQuizService.setQuizSettings(data);
    this.router.navigate(['quick-quiz/play']);
  }

  checkFormValidity() {
    if (
      !this.quizOption.valid &&
      (this.quizOption.controls['category'].hasError('required') ||
        this.quizOption.controls['difficulty'].hasError('required'))
    ) {
      this.quizOption.markAllAsTouched();
      return false;
    } else {
      return true;
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
