import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() formGroupName!: string;

  @Input() controlName!: string;

  @Input() data!: any;

  @Input() rowIndex!: number;

  @Input() showInput!: boolean;

  @Output() handleSelect = new EventEmitter<any>();

  @Output() handleUpdate = new EventEmitter<any>();

  form!: FormGroup;

  validationStatus = '';

  constructor(private rootFormGroup: FormGroupDirective) { }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    this.form.patchValue({
      [this.controlName]: this.data.strDrink,
    });
  }

  onSelect() {
    this.showInput = true;
    this.form.updateValueAndValidity();
    this.handleSelect.emit();
  }

  onUpdate(event: any, cell: string) {
    if (this.form.valid) {
      this.validationStatus = 'success';
      this.showInput = false;
      this.handleUpdate.emit({ cell, event })
    } else {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          this.validationStatus = 'error';
        }
      });
    }
  }

}
