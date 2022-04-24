import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cnn-cancer',
  templateUrl: './cnn-cancer.component.html',
  styleUrls: ['./cnn-cancer.component.scss']
})
export class CnnCancerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loadModel();
  }

  loadModel() {
  }
}
