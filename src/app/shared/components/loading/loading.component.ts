import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LoadingService } from 'src/app/service/loading/loading.service';

@Component({
	selector: 'loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent implements OnInit {
	constructor(public loadingService: LoadingService) {}

	ngOnInit(): void {}
}
