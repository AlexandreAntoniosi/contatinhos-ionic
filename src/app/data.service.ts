import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  createCustomer(data: any) {
    return this.http.post(`${environment.apiUrl}/account`, data);
  }

  auth(data: any) {
    return this.http.post(`${environment.apiUrl}/account/login`, data);
  }

  reset(data: any) {
    return this.http.post(`${environment.apiUrl}/account/reset`, data);
  }

  getContacts() {
    return this.http.get(`${environment.apiUrl}/contacts`);
  }

  getContact(id: string) {
    return this.http.get(`${environment.apiUrl}/contacts/${id}`);
  }
}
