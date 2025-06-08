import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Part } from '../models/part.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartsService {
  private apiUrl = environment.apiUrl + '/parts';

  constructor(private http: HttpClient) {}

  getParts(): Observable<Part[]> {
    return this.http.get<Part[]>(this.apiUrl);
  }

  getPart(id: number): Observable<Part> {
    return this.http.get<Part>(`${this.apiUrl}/${id}`);
  }

  getPartById(id: number): Observable<Part> {
    return this.http.get<Part>(`${this.apiUrl}/${id}`);
  }

  addPart(part: Partial<Part>): Observable<any> {
    return this.http.post(this.apiUrl, part);
  }

  updatePart(part: Part): Observable<any> {
    return this.http.put(`${this.apiUrl}/${part.id}`, part);
  }

  deletePart(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}