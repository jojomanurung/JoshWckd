import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import * as _ from 'lodash-es';
import { QuickQuizService } from '@service/quick-quiz/quick-quiz.service';
import { Score } from '@shared/interface/quick-quiz/quick-quiz';

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
              '600ms',
              animate(
                '500ms cubic-bezier(.34,.02,.81,1)',
                style({ opacity: 1 })
              )
            ),
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [stagger('0ms', animate('0ms', style({ opacity: 0 })))],
          {
            optional: true,
          }
        ),
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
      this.highscore = [];
      if (x && x.length) {
        setTimeout(() => {
          this.highscore = _.cloneDeep(x);
        }, 1000);
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
