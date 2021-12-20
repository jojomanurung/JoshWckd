import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/service/loading/loading.service';
import { NavService } from 'src/app/service/nav/nav.service';
import { QuickQuizService } from 'src/app/service/quick-quiz/quick-quiz.service';
import { SubSink } from 'subsink';
import * as _ from 'lodash-es';
import { MatDialog } from '@angular/material/dialog';
import { QuickQuizEndDialogComponent } from '../quick-quiz-end-dialog/quick-quiz-end-dialog.component';

@Component({
  selector: 'app-quick-quiz-play',
  templateUrl: './quick-quiz-play.component.html',
  styleUrls: ['./quick-quiz-play.component.scss'],
})
export class QuickQuizPlayComponent implements OnInit, OnDestroy {
  myInnerHeight: any;
  isMobile!: boolean;
  private subs = new SubSink();
  isAcceptingAnswer = false;
  quizOption: any;
  token: any;
  questions!: any[];

  currentQuestion: any;
  availableQuestions: any;
  score = 0;
  questionCounter = 0;

  CORRECT_BONUS = 10;
  MAX_QUESTIONS = 10;

  progressBar: any;

  choiceSelected = false;

  constructor(
    private navService: NavService,
    public loadingService: LoadingService,
    private quickQuizService: QuickQuizService,
    private router: Router,
    private render: Renderer2,
    private dialog: MatDialog
  ) {
    this.subs.sink = this.navService.isMobile.subscribe(
      (e: boolean) => (this.isMobile = e)
    );
  }

  ngOnInit(): void {
    this.quizOption = this.quickQuizService.getQuizSettings();
    this.token = this.quickQuizService.sessionToken?.token;
    this.getQuiz();
  }

  getAutomaticHeight() {
    const navHeight = this.isMobile ? 56 : 64;
    this.myInnerHeight = window.innerHeight - navHeight;
    return this.myInnerHeight;
  }

  getQuiz() {
    this.loadingService.loadingOn();
    this.subs.sink = this.quickQuizService
      .getQuiz(this.quizOption, this.token)
      .subscribe((resp) => {
        if (resp && resp.length) {
          console.log(resp);
          const question = _.cloneDeep(resp);
          if (question && question.length) {
            this.mapQuestionList(question);
          }
          this.loadingService.loadingOff();
          this.startGame();
        } else {
          this.loadingService.loadingOff();
          this.router.navigate(['quick-quiz']);
        }
      });
  }

  mapQuestionList(data: any[]) {
    if (data && data.length) {
      let tmpQuestion = data.map((item: any) => {
        return {
          question: item.question,
          choices: [...item.incorrect_answers, item.correct_answer],
          correct_answer: item.correct_answer,
          category: item.category,
          difficulty: item.difficulty,
        };
      });

      tmpQuestion.forEach((item) => {
        item.choices = _.shuffle(item.choices);
      });

      this.questions = _.cloneDeep(tmpQuestion);
      console.log(tmpQuestion);
    }
  }

  startGame() {
    this.questionCounter = 0;
    this.score = 0;
    this.availableQuestions = [...this.questions];
    this.getNewQuestion();
  }

  getNewQuestion() {
    if (
      this.availableQuestions.length === 0 ||
      this.questionCounter >= this.MAX_QUESTIONS
    ) {
      // open end dialog
      this.openEndDialog();
      return;
    }
    this.questionCounter++;

    // update progress bar
    this.progressBar = (this.questionCounter / this.MAX_QUESTIONS) * 100;

    //  buat pointer untuk soal saat ini
    const questionIndex = Math.floor(
      Math.random() * this.availableQuestions.length
    );

    //  pilih soal saat ini berdasarkan soal yang tersedia menggunakan pointer questionIndex
    this.currentQuestion = this.availableQuestions[questionIndex];
    console.log(this.currentQuestion);

    this.availableQuestions.splice(questionIndex, 1);

    this.isAcceptingAnswer = true;
  }

  chooseAnswer(data: number) {
    if (!this.isAcceptingAnswer) {
      return;
    }
    this.isAcceptingAnswer = false;

    const target = event?.target;
    const classs =
      this.currentQuestion.correct_answer === data ? 'correct' : 'incorrect';

    this.choiceSelected = true;

    // to increment Score number in HUD
    if (classs === 'correct') {
      this.incrementScore(this.CORRECT_BONUS);
    }

    // to relfect if the selected choice correct or incorrect
    this.render.addClass(target, classs);

    setTimeout(() => {
      this.render.removeClass(target, classs);
      this.choiceSelected = false;
      this.getNewQuestion();
    }, 2000);
  }

  incrementScore(correct: number) {
    this.score += correct;
  }

  openEndDialog() {
    const dialog = this.dialog.open(QuickQuizEndDialogComponent, {
      autoFocus: false,
      disableClose: true,
      data: this.score,
    });

    this.subs.sink = dialog.afterClosed().subscribe((resp) => {
      if (resp) {
        console.log('resp', resp);
        this.router.navigate(['quick-quiz']);
      }
    });
  }

  ngOnDestroy(): void {
    this.quickQuizService.setQuizSettings(undefined);
    this.subs.unsubscribe();
  }
}
