import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import { Register } from '../../interfaces/Register';

import { MatDialog} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ErrorDialogComponent } from '../error_dialog/error-dialog.component';



@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

     private accesoService = inject(AccesoService);
     private router = inject(Router);
     public formBuild = inject(FormBuilder);
     private dialog = inject(MatDialog);

     public formRegistro: FormGroup = this.formBuild.group({
          idIdent: ['',Validators.required],
          password: ['',Validators.required],
          role: ['',Validators.required]
     })

     registrarse(){
          if(this.formRegistro.invalid) return;

          const objeto:Register = {
               idIdent: this.formRegistro.value.idIdent,
               password: this.formRegistro.value.password,
               role: this.formRegistro.value.role,
               // status: this.formRegistro.value.status
               status: true
          }

          this.accesoService.registrarse(objeto).subscribe({
               next: (data) =>{
                    if(data.isSucces == true){
                         this.router.navigate([''])
                    }else{
                         // alert(data.message)
                         this.openErrorDialog(data.message);
                    }
               }, error:(error) =>{
                    // console.log(error.message);
                    this.openErrorDialog('Error al registrarse: ' + error.message);
               }
          })

     }

     volver(){
          this.router.navigate([''])
     }

     openErrorDialog(message: string): void {
          this.dialog.open(ErrorDialogComponent, {
            data: { message },
          });
        }

}
