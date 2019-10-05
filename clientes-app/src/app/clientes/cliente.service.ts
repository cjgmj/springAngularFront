import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClienteService {

  private urlEndPoint = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.urlEndPoint}/api/clientes`);
  }
}
