import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { QuickQuizService } from 'src/app/service/quick-quiz/quick-quiz.service';

@Component({
  templateUrl: './quick-quiz-end-dialog.component.html',
  styleUrls: ['./quick-quiz-end-dialog.component.scss'],
})
export class QuickQuizEndDialogComponent implements OnInit {
  greetingText!: string;
  nameCtrl = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<QuickQuizEndDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private quickQuizService: QuickQuizService
  ) {}

  ngOnInit(): void {
    if (this.data >= 70) {
      this.greetingText = 'Congratulation!';
    } else if (this.data >= 40 && this.data < 70) {
      this.greetingText = `Don't give up!`;
    } else {
      this.greetingText = 'Try Again';
    }
    this.nameCtrl.setValidators(Validators.required);
  }

  saveScore() {
    if (this.nameCtrl.hasError('required')) {
      this.nameCtrl.markAsTouched({ onlySelf: true });
      return;
    }

    const payload = {
      name: this.nameCtrl.value,
      score: this.data,
      time: moment().utc().format('DD/MM/YYYY HH:mm'),
    };

    this.quickQuizService.saveScore(payload).finally(() => {
      this.dialogRef.close(true);
    });
  }
}
