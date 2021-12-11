import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuickQuizService {
  private quizOption: any;

  constructor(private httpClient: HttpClient) {}

  get sessionToken() {
    const sessionObject = sessionStorage.getItem('quizSession');
    const sessionToken = sessionObject ? JSON.parse(sessionObject) : null;
    return sessionToken;
  }

  getCategory(): Observable<any> {
    return this.httpClient
      .get('https://opentdb.com/api_category.php', { responseType: 'json' })
      .pipe(map((data: any) => data.trivia_categories));
  }

  getToken(): Observable<any> {
    return this.httpClient.get(
      'https://opentdb.com/api_token.php?command=request',
      { responseType: 'json' }
    );
  }

  setQuizSettings(data: any) {
    this.quizOption = data;
  }

  getQuizSettings() {
    return this.quizOption;
  }

  getQuiz(quizOptions: any, token: string): Observable<any> {
    const category = quizOptions.category;
    const difficulty = quizOptions.difficulty;

    const options = new HttpParams()
      .set('amount', '10')
      .set('type', 'multiple')
      .set('category', category)
      .set('difficulty', difficulty)
      .set('token', token);

    return this.httpClient
      .get('https://opentdb.com/api.php', {
        responseType: 'json',
        params: options,
      })
      .pipe(map((data: any) => data.results));
  }
}
