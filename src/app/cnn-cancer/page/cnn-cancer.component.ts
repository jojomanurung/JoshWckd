import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as tf from '@tensorflow/tfjs';
import { LoadingService } from 'src/app/service/loading/loading.service';

@Component({
  selector: 'app-cnn-cancer',
  templateUrl: './cnn-cancer.component.html',
  styleUrls: ['./cnn-cancer.component.scss']
})
export class CnnCancerComponent implements OnInit {
  @ViewChild('image', {static: false}) img!: ElementRef;
  model!: tf.LayersModel;
  imageInput = new FormControl('');
  prediction!: any[];

  CLASS_NAME = ['Benign', 'Malignant'];

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadModel();
  }

  async loadModel() {
    this.loadingService.loadingOn();
    const modelUrl = '../../../assets/models/cnn-cancer/model.json';
    console.log('modelUrl', modelUrl)
    this.model = await tf.loadLayersModel(modelUrl);
    console.log('model', this.model);
    this.loadingService.loadingOff();
  }

  async fileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (res: any) => {
        this.imageInput.patchValue(res.target.result);
        setTimeout( async () => {
          this.predictFrames();
        });
      };
    }
  }

  async predictFrames() {
    const image = tf.tidy(() => {
      let img = this.img.nativeElement;
      img = tf.browser.fromPixels(img)
                      .resizeNearestNeighbor([224,224])
                      .toFloat()
                      .expandDims(0);
      return img;
    });

    const result = await this.model.predict(image) as any;
    const prediction = Array.from(result.dataSync());
    this.prediction = prediction.map((prob, index) => {
      return {
        probability: prob,
        class_name: this.CLASS_NAME[index]
      }
    })
    console.log('prediction', this.prediction);
  }
}
