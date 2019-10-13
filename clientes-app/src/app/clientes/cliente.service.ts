import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';

@Injectable()
export class ClienteService {

  private urlEndPoint = 'http://localhost:8080';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get(`${this.urlEndPoint}/api/clientes`).pipe(
      map(response => {
        const clientes = response as Cliente[];

        return clientes.map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          // Forma 1 para formatear la fecha
          // cliente.createAt = formatDate(cliente.createAt, 'dd/MM/yyyy', 'en-US');

          // Forma 2 para formatear la fecha
          const datePipe = new DatePipe('en-US');
          cliente.createAt = datePipe.transform(cliente.createAt, 'dd/MM/yyyy');

          return cliente;
        });
      })
    );
  }

  create(cliente: Cliente): Observable<any> {
    return this.http.post<any>(`${this.urlEndPoint}/api/clientes`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if ( e.status === 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/api/clientes/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put(`${this.urlEndPoint}/api/clientes/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      map((resp: any) => resp.cliente as Cliente),
      catchError(e => {

        if ( e.status === 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/api/clientes/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
