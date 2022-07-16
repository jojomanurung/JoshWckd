import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

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

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    const currTheme = localStorage.getItem('theme');
    this.loadStyle(currTheme ? currTheme : 'one-dark');
  }

  loadStyle(styleName: string) {
    // save selected theme to local storage
    localStorage.setItem('theme', styleName);

    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById(
      'themeAsset'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `${styleName}.css`;
    } else {
      const style = this.document.createElement('link');
      style.id = 'themeAsset';
      style.rel = 'stylesheet';
      style.href = `${styleName}.css`;

      head.appendChild(style);
    }
  }
}
