import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  readonly ColumnMode = ColumnMode;

  rows: Array<any> = [];

  columns: Array<any> = [];

  editing: any = {};

  nameForm = this.formBuilder.group({ }) as FormGroup;

  tableForm: FormGroup = this.formBuilder.group({
    validateTrigger: 'onBlur',
    nameForm: this.nameForm,
  }, { updateOn: 'blur' });

  // Templates: Columns
  @ViewChild('defaultHdrTpl', { static: true })
  defaultHdrTpl!: TemplateRef<any>;

  // Templates: Rows
  @ViewChild('nameTpl', { static: true })
  nameTpl!: TemplateRef<any>;

  @ViewChild('categoryTpl', { static: true })
  categoryTpl!: TemplateRef<any>;

  @ViewChild('tagsTpl', { static: true })
  tagsTpl!: TemplateRef<any>;

  @ViewChild('updatedTpl', { static: true })
  updatedTpl!: TemplateRef<any>;

  @ViewChild('glassTypeTpl', { static: true })
  glassTypeTpl!: TemplateRef<any>;

  @ViewChild('instructionsTpl', { static: true })
  instructionsTpl!: TemplateRef<any>;

  name: string = '';

  validationStatus = '';

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.validationStatus = '';
    this.columns = [
      {
        name: 'Name',
        prop: 'strDrink',
        cellTemplate: this.nameTpl,
        headerTemplate: this.defaultHdrTpl,
      },
      {
        name: 'Category',
        prop: 'strCategory',
        cellTemplate: this.categoryTpl,
        headerTemplate: this.defaultHdrTpl,
      },
      {
        name: 'Tags',
        prop: 'strTags',
        cellTemplate: this.tagsTpl,
        headerTemplate: this.defaultHdrTpl,
      },
      {
        name: 'Last updated',
        prop: 'dateModified',
        cellTemplate: this.updatedTpl,
        headerTemplate: this.defaultHdrTpl,
      },
      {
        name: 'Glass Type',
        prop: 'strGlass',
        cellTemplate: this.glassTypeTpl,
        headerTemplate: this.defaultHdrTpl,
      },
      // {
      //   name: 'Instructions',
      //   prop: 'strInstructions',
      //   cellTemplate: this.instructionsTpl,
      // },
    ];

    this.itemService.getList().subscribe((resp: any) => {
      this.rows = [...resp.drinks];
    })
  }

  initializeForm() {
    this.tableForm.addControl(this.name, new FormControl(''));
  }

  onSelectName(rowIndex: number) {
    this.editing[rowIndex + '-strDrink'] = true;
    let drink = this.rows[rowIndex];
    this.name = `${rowIndex}_name`;
    this.tableForm.addControl(this.name, new FormControl(''));
    this.tableForm.controls[this.name].setValidators([Validators.required, Validators.maxLength(20)]);
    this.tableForm.patchValue({
      [this.name]: drink.strDrink,
    });
    this.tableForm.updateValueAndValidity();
  }

  updateValue(event: any, cell: string, rowIndex: number) {
    if (this.tableForm.valid) {
      this.validationStatus = 'success';
      this.editing[rowIndex + '-' + cell] = false;
      this.rows[rowIndex][cell] = event.target.value;
      this.rows = [...this.rows];
      this.initializeForm();
    } else {
      Object.values(this.tableForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          this.validationStatus = 'error';
        }
      });
    }
  }

  getName(rowIndex: number) {
    const name = `${rowIndex}_name`;
    if (!this.nameForm.controls[name]) {
      this.nameForm.addControl(name, new FormControl(''));
      this.nameForm.controls[name].setValidators([Validators.required, Validators.maxLength(20)]);
    }
    return name;
  }
}
