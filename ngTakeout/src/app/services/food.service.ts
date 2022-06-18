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
  // update(todo: Todo): Observable<Todo> {
  //   if (todo.completed) {
  //     todo.completeDate = this.datePipe.transform(Date.now(),'shortDate');
  //   } else {
  //     todo.completeDate = "";
  //   }

  //   return this.http.put<Todo>(this.url + "/" + todo.id, todo).pipe(
  //   // return this.http.put<Todo>(`{this.url}/${todo.id}`, todo).pipe(
  //     catchError((err: any) => {
  //       console.error(err);
  //       return throwError(
  //         () => new Error('TodoService.update(): error updating Todo: ' + err)
  //       );
  //     })
  //   );
  // }
  // delete(id: number): Observable<Todo> {
  //   return this.http.delete<Todo>(`${this.url}/${id}`).pipe(
  //     catchError((err: any) => {
  //       console.error(err);
  //       return throwError(
  //         () => new Error('TodoService.create(): error deleting Todo: ' + err)
  //       );
  //     })
  //   );
  // }
}
