import * as angular from 'angular';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {downgradeInjectable} from '@angular/upgrade/static';
import { Inject, Injectable } from '@angular/core';

export class Contact {
  private apiRoot: string = 'http://localhost:3000/contacts';

  constructor(@Inject(HttpClient) private http: HttpClient) {
  }

  query(params: { [key: string]: string }) {
    return this.http.get<Array<any>>(this.apiRoot, { params }).toPromise()
  }

  get(id: string, params?: {  [key: string]: string }) {
    return this.http.get(this.apiRoot + '/' + id, { params }).toPromise();
  }

  save(data: any) {
    return this.http.post(this.apiRoot, data).toPromise();
  }

  update(data: any) {
    return this.http.put(this.apiRoot + '/' + data.id, data).toPromise();
  }

  remove(data: any) {
    return this.http.delete(this.apiRoot + '/' + data.id).toPromise();
  }

}
