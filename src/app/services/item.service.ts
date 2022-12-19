import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
  export class ItemService {
    constructor(private http: HttpClient) {
  }

  getList() {
    return this.http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=all').pipe(map(response => response ));
  }
}