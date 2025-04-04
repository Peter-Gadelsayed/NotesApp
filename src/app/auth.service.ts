import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLogged():boolean {
    if (localStorage.getItem("token") === null) {
      return false
    } else {
      return true
    }
  }
}
