/* eslint-disable @angular-eslint/component-selector */
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LoadingService } from 'src/app/service/loading/loading.service';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {}
}
