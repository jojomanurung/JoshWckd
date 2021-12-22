import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { QuickQuizRoutingModule } from './quick-quiz-routing.module';
import { QuickQuizComponent } from './page/quick-quiz.component';
import { QuickQuizPlayComponent } from './components/quick-quiz-play/quick-quiz-play.component';
import { QuickQuizEndDialogComponent } from './components/quick-quiz-end-dialog/quick-quiz-end-dialog.component';
import { QuickQuizHighscoreComponent } from './components/quick-quiz-highscore/quick-quiz-highscore.component';

@NgModule({
  declarations: [
    QuickQuizComponent,
    QuickQuizPlayComponent,
    QuickQuizEndDialogComponent,
    QuickQuizHighscoreComponent,
  ],
  imports: [CommonModule, SharedModule, QuickQuizRoutingModule],
})
export class QuickQuizModule {}
