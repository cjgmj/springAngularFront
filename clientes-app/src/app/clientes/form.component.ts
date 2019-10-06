import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  protected cliente: Cliente = new Cliente();
  protected titulo = 'Creat cliente';

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit() {
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(response => {
        this.router.navigate(['/clientes']);
        swal.fire('Cliente guardado', `El cliente ${response.nombre} se ha creado con éxito`, 'success');
      }
    );
  }

}
