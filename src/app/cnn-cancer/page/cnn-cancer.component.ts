import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoadingService } from '@service/loading/loading.service';
import { SubSink } from 'subsink';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-cnn-cancer',
  templateUrl: './cnn-cancer.component.html',
  styleUrls: ['./cnn-cancer.component.scss']
})
export class CnnCancerComponent implements OnInit, OnDestroy {
  @ViewChild('image', {static: false}) img!: ElementRef;
  private subs = new SubSink();
  model!: tf.LayersModel;
  imageName = new FormControl('');
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
    this.model = await tf.loadLayersModel(modelUrl);
    // Warm up the model
    const result = await this.model.predict(tf.zeros([1, 224, 224, 3])) as any;
    result.dataSync();
    result.dispose();
    this.loadingService.loadingOff();
  }

  async fileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (res: any) => {
        this.imageInput.patchValue(res.target.result);
        this.imageName.patchValue(file.name);
        // Set timeout to wait image loaded in the DOM
        setTimeout( async () => {
          await this.predictFrames();
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
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
