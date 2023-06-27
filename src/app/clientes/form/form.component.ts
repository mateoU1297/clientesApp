import { Component } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  public cliente: Cliente = {id: 0, nombre: '', apellido: '', email: ''};
  public titulo: string = 'Crear Cliente';
  public msjBoton: string = 'Crear';

  formCliente: FormGroup = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    createAt: ['']
  });

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}


  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id: string = params['id'];
      if(id){
        this.clienteService.getCliente(id)
          .subscribe((cliente: Cliente) => {
            this.formCliente.setValue(cliente);
            this.msjBoton = 'Editar';
          });
      }
    });
  }

  create(): void {
    this.cliente = {
      id: this.formCliente.get('id')?.value,
      nombre: this.formCliente.get('nombre')?.value,
      apellido: this.formCliente.get('apellido')?.value,
      email: this.formCliente.get('email')?.value
    };

    console.log(this.cliente);

    if(this.cliente.id <= 0) {
      this.clienteService.create(this.cliente)
        .subscribe(cliente => {
          this.router.navigate(['/clientes']);
          Swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} creado con éxito!`, 'success');
        });
    } else {
      this.clienteService.update(this.cliente)
        .subscribe( cliente => {
          this.router.navigate(['/clientes']);
          Swal.fire('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con éxito!`, 'success');
        });
    }
  }
}
