import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { authGuard } from './custom/auth.guard';

export const routes: Routes = [
     {path:"", component:LoginComponent},
     {path:"registro", component:RegistroComponent},
     {path:"inicio", component:InicioComponent , canActivate:[authGuard]},
     {path:"detalle/:id", component:DetalleComponent , canActivate:[authGuard]},
];
