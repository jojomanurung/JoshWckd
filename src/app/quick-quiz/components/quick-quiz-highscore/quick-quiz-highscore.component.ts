import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash-es';
import { QuickQuizService } from 'src/app/service/quick-quiz/quick-quiz.service';
import { Score } from 'src/app/shared/interface/quick-quiz/quick-quiz';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-quick-quiz-highscore',
  templateUrl: './quick-quiz-highscore.component.html',
  styleUrls: ['./quick-quiz-highscore.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger(
              '60ms',
              animate(
                '600ms cubic-bezier(.34,.02,.81,1)',
                style({ opacity: 1 })
              )
            ),
          ],
          { optional: true }
        ),
        query(':leave', animate('200ms', style({ opacity: 0 })), {
          optional: true,
        }),
      ]),
    ]),
  ],
})
export class QuickQuizHighscoreComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  highscore: Score[] = [];

  constructor(private quickQuizService: QuickQuizService) {}

  ngOnInit(): void {
    this.getHighScore();
  }

  getHighScore() {
    this.subs.sink = this.quickQuizService.getHighScore().subscribe((x) => {
      if (x && x.length) {
        this.highscore = x;
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
