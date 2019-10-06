import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  private titulo = 'Creat cliente';

  constructor() { }

  ngOnInit() {
  }

  public create(): void {
    console.log('Clicked');
    console.log(this.cliente);
  }

}
