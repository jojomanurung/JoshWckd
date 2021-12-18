import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AngularFireUploadTask } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ManagementService } from 'src/app/service/management/management.service';
import { UploadService } from 'src/app/service/upload/upload.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit, OnChanges, OnDestroy {
  @Input() project: any;
  @Output() action = new EventEmitter();
  private subs = new SubSink();
  form!: FormGroup;
  initialForm: any;
  editMode = false;
  percentage!: Observable<any>;
  snapshot!: Observable<any>;
  isUploading!: boolean;

  constructor(
    private fb: FormBuilder,
    private managementService: ManagementService,
    private uploadService: UploadService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.initForm();
    // this is to detect every changes emitted from parent component
    // we are looping all input name inside SimpleChanges
    // then log the input that emit new value and prev value
    for (let propName in changes) {
      // let change = changes[propName];
      // let curVal = change.currentValue;
      // let prevVal = change.previousValue;
      // console.log(curVal);
      // console.log(prevVal);

      if (propName === 'project') {
        if (this.project) {
          this.editMode = true;
          this.patchForm();
        }
      }
    }
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      link: ['', Validators.required],
      active: [false],
      screenShot: this.fb.group({
        name: [''],
        safeName: [''],
        link: [''],
      }),
    });
    this.initialForm = this.form.getRawValue();
  }

  patchForm() {
    this.form.patchValue(this.project);
    this.initialForm = this.form.getRawValue();
    // console.log(this.form.value, this.initialForm);
  }

  compare() {
    const initial = JSON.stringify(this.initialForm);
    const current = JSON.stringify(this.form.getRawValue());

    if (initial === current) {
      return true;
    } else {
      return false;
    }
  }

  handleUpload(event: any) {
    const file: File = event.target.files[0];
    const acceptable = ['jpg', 'jpeg', 'png', 'svg'];
    // console.log(file);

    if (file) {
      const fileType = this.uploadService
        .getFileType(file.name)
        ?.toLocaleLowerCase();

      if (acceptable.includes(fileType!)) {
        this.isUploading = true;

        const uniqName = this.uploadService.getUniqueSafeName(file);

        this.form.get('screenShot')?.get('name')?.patchValue(file.name);

        this.form
          .get('screenShot')
          ?.get('safeName')
          ?.patchValue(uniqName.uniqueSafeName);

        const uploadTask = this.uploadService.uploadFile(uniqName.path, file);
        this.percentage = uploadTask.percentageChanges();
        this.snapshot = uploadTask.snapshotChanges().pipe(
          finalize(async () => {
            const downloadUrl = await uniqName.ref.getDownloadURL().toPromise();
            const fileUrl = downloadUrl;
            this.form.get('screenShot')?.get('link')?.patchValue(fileUrl);
            // console.log(fileUrl);
            this.isUploading = false;
          })
        );
        this.subs.sink = this.snapshot.subscribe();
      }
    }
  }

  async deleteImg() {
    const downloadUrl = this.form.get('screenShot')?.get('link')?.value;
    const deletes = await this.uploadService.deleteFile(downloadUrl);
    this.form.get('screenShot')?.get('name')?.patchValue('');
    this.form.get('screenShot')?.get('safeName')?.patchValue('');
    this.form.get('screenShot')?.get('link')?.patchValue('');
  }

  save() {
    if (!this.editMode) {
      const payload = this.form.value;
      // console.log('payloadnya', payload);
      this.managementService.saveProject(payload);
      this.action.emit('save');
    } else {
      const payload = this.form.value;
      payload.id = this.project.id;
      // console.log('payloadnya', payload);
      this.managementService.editProject(payload);
      this.action.emit('save');
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
