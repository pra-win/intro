import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor() { }

  public ISSHOWFUTURERANSACTION = "is-show-future-transaction";

  setPreference(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  getPreference(key:string) {
    return localStorage.getItem(key);
  }

}
