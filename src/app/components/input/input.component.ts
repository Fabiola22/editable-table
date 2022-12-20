import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, Validators } from '@angular/forms';

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
  }

  onUpdate(event: any, cell: string, rowIndex: number) {
    this.showInput = false;

  }

}
