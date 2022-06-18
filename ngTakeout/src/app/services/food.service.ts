import { Food } from './../models/food';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError, catchError } from 'rxjs';
import { formatDate } from '@angular/common';

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
  create(food: Food): Observable<Food> {
    return this.http.post<Food>(this.url, food).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () => new Error('FoodService.create(): error creating Food: ' + err)
        );
      })
    );
  }
  update(food: Food): Observable<Food> {

    return this.http.put<Food>(this.url + "/" + food.id, food).pipe(
    // return this.http.put<Todo>(`{this.url}/${todo.id}`, todo).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () => new Error('FoodService.update(): error updating Food: ' + err)
        );
      })
    );
  }
  delete(id: number): Observable<Food> {
    return this.http.delete<Food>(`${this.url}/${id}`).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () => new Error('FoodService.delete(): error deleting Food: ' + err)
          );
      })
    );
  }
}
