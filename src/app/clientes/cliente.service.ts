import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Cliente } from './cliente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlEndPoint)
    .pipe(
      map((clientes:Cliente[]) => {
        return clientes;
      })
    );
  }
}
