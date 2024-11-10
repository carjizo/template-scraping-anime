import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { ResponseUsuario } from '../interfaces/ResponseUsuarios';
import { Observable } from 'rxjs';

@Injectable({
     providedIn: 'root'
})
export class ResponseUsuarioService {
     private http = inject(HttpClient);
     private baseUrl: string = appsettings.apiUrl;
     constructor() { }
     lista() : Observable<ResponseUsuario>{
          return  this.http.get<ResponseUsuario>(`${this.baseUrl}/users/all`)
       }

}
