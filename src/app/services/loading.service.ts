import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  private subject = new Subject<any>();

    setLoading(isLoading: boolean ) {
        this.subject.next({ loading: isLoading });
    }

    clearMessages() {
        this.subject.next();
    }

    getLoading(): Observable<any> {
        return this.subject.asObservable();
    }

}
