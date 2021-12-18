import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagementService } from 'src/app/service/management/management.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit, OnChanges {
  @Input() project: any;
  @Output() action = new EventEmitter();
  form!: FormGroup;
  initialForm: any;
  editMode = false;

  constructor(
    private fb: FormBuilder,
    private managementService: ManagementService
  ) {}

  ngOnInit(): void {}

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
}
