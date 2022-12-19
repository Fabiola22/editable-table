import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  tableForm!: FormGroup;

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

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.initializeForm();

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
    this.tableForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: [''],
      tags: [''],
      glassType: [''],
    })
  }

  onSelectName(rowIndex: number) {
    this.editing[rowIndex + '-strDrink'] = true;
    let drink = this.rows[rowIndex];
    this.tableForm.patchValue({
      name: drink.strDrink,
    });
    this.tableForm.updateValueAndValidity();
  }

  updateValue(event: any, cell: string, rowIndex: number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    this.initializeForm();
  }

}
