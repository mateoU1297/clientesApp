import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
       clientes => this.clientes = clientes
    );
  }

  delete(cliente: Cliente): void {
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      showCancelButton: true,
      icon: 'success',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.value) {

        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            Swal.fire(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }

}
