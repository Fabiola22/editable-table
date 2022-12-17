import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Event } from '@angular/router';

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

  tableForm = this.fb.group({
    name: ['', Validators.required],
    category: [],
    tags: [],
    glassType: [],
  });

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
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
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

    this.http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=all').subscribe((resp: any) => {
      this.rows = [...resp.drinks];
    })
  }

  onSelectName(rowIndex: number) {
    this.editing[rowIndex + '-strDrink'] = true;
  }

  updateValue(event: any, cell: string, rowIndex: number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

}
