import { Component, inject } from '@angular/core';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../interfaces/Login';
import { ErrorDialogComponent } from '../error_dialog/error-dialog.component';

import { MatDialog} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

     private accesoService = inject(AccesoService);
     private router = inject(Router);
     public formBuild = inject(FormBuilder);
     private dialog = inject(MatDialog);

     public formLogin: FormGroup = this.formBuild.group({
          idIdent: ['',Validators.required],
          password: ['',Validators.required]
     })

     iniciarSesion(){
          if(this.formLogin.invalid) return;

          const objeto:Login = {
               idIdent: this.formLogin.value.idIdent,
               password: this.formLogin.value.password
          }
       
          this.accesoService.login(objeto).subscribe({
               next:(data) =>{
                    if(data.isSucces == true){
                         localStorage.setItem("token",data.token)
                         this.router.navigate(['inicio'])
                    }else{
                         this.openErrorDialog(data.message);
                         // alert(data.message)
                    }
               },
               error:(error) =>{
                    // console.log(error.message);
                    this.openErrorDialog('Error al registrarse: ' + error.message);
               }
          })
     }

     registrarse(){
          this.router.navigate(['registro'])
     }

     openErrorDialog(message: string): void {
          this.dialog.open(ErrorDialogComponent, {
            data: { message },
          });
     }
}
