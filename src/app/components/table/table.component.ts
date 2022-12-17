import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  readonly ColumnMode = ColumnMode;

  rows: Array<any> = [];

  columns: Array<any> = [];

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
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.columns = [
      {
        name: 'Name',
        prop: 'strDrink',
        cellTemplate: this.nameTpl,
      },
      {
        name: 'Category',
        prop: 'strCategory',
        cellTemplate: this.categoryTpl,
      },
      {
        name: 'Tags',
        prop: 'strTags',
        cellTemplate: this.tagsTpl,
      },
      {
        name: 'Last updated',
        prop: 'dateModified',
        cellTemplate: this.updatedTpl,
      },
      {
        name: 'Glass Type',
        prop: 'strGlass',
        cellTemplate: this.glassTypeTpl,
      },
      {
        name: 'Instructions',
        prop: 'strInstructions',
        cellTemplate: this.instructionsTpl,
      },
    ];

    this.http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin').subscribe((resp: any) => {
      this.rows = [...resp.drinks];
    })
  }

}
