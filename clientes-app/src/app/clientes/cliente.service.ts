import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ClienteService {

  private urlEndPoint = 'http://localhost:8080';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get(`${this.urlEndPoint}/api/clientes`).pipe(
      map(response => response as Cliente[])
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.urlEndPoint}/api/clientes`, cliente, {headers: this.httpHeaders});
  }
}
