import { Component, OnInit } from '@angular/core';
import { NavService } from '@service/nav/nav.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
})
export class ThemePickerComponent implements OnInit {
  themeList = [
    {
      name: 'One Dark',
      value: 'one-dark',
      color_preview: '#79bbf1',
    },
    {
      name: 'Monokai',
      value: 'monokai',
      color_preview: '#b3e64d',
    },
  ];

  constructor(private navService: NavService) {}

  ngOnInit(): void {}

  loadStyle(styleName: string) {
    this.navService.currTheme = styleName;
  }
}
