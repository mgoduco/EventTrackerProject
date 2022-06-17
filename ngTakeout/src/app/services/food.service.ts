import { Food } from './../models/food';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private url = environment.baseUrl + 'api/food';

  constructor(private http: HttpClient) {}

  index(): Observable<Food[]> {
    return this.http.get<Food[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.index(): error retrieving todos: ' + err)
        );
      })
    );
  }
}
