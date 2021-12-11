import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Score } from 'src/app/shared/interface/quick-quiz/quick-quiz';

@Injectable({
  providedIn: 'root',
})
export class QuickQuizService {
  private quizOption: any;
  quickQuizCollection = this.store.doc('project/quick-quiz');

  constructor(
    private httpClient: HttpClient,
    private store: AngularFirestore
  ) {}

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

  getHighScore(): Observable<Score[]> {
    return this.quickQuizCollection
      .collection('highscore', (ref) =>
        ref.orderBy('score', 'desc').orderBy('time', 'desc').limit(5)
      )
      .snapshotChanges()
      .pipe(
        map((action) =>
          action.map((a) => {
            const data = a.payload.doc.data() as Score;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  saveScore(payload: any) {
    this.quickQuizCollection.collection('highscore').add(payload);
  }
}
