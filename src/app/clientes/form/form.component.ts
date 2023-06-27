import { Component } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  public cliente: Cliente = {id: 0, nombre: '', apellido: '', email: ''};
  public titulo: string = 'Crear Cliente';

  formCliente: FormGroup = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}


  create(): void {
    
  }

  update(): void {

  }
}
