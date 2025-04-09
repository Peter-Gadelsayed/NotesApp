import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notes } from 'src/app/models/notes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.baseUrl;
  pageName: string = 'notes';

  apiUrl(): string {
    return `${this.baseUrl}/${this.pageName}`;
  }

  constructor(private http: HttpClient) { }
  getNotes(): Observable<any> {
    return this.http.get<any>(this.apiUrl());
  }

  postNote(note: Notes): Observable<any> {
    return this.http.post<any>(this.apiUrl(), note);
  }

  deleteNote(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl()}/${id}`);
  }

  getNoteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl()}/${id}`);
  }

  updateNote(id: number, note: Notes): Observable<any> {
    return this.http.put<any>(`${this.apiUrl()}/${id}`, note);
  }
}
