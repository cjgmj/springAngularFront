import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe( clientes => this.clientes = clientes );
  }

  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-1',
        cancelButton: 'btn btn-danger mx-1'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: `¿Estás seguro que desea eliminar al cliente ${cliente.nombre}?`,
      text: 'No podrás deshacerlo',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe( resp => {
          this.clientes = this.clientes.filter(cli => cli !== cliente);
          swalWithBootstrapButtons.fire(
            'Cliente eliminado',
            `El cliente ${cliente.nombre} eliminado con éxito`,
            'success'
          );
        });
      }
    });
  }

}
