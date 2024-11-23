import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { AccesoService } from '../services/acceso.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
     // debugger;
     if(req.url.indexOf("auth") > 0)  return next(req);

     const token = localStorage.getItem("token");
     const clonRequest = req.clone({
          setHeaders:{
               Authorization: `Bearer ${token}`
          }
     })

     // return next(clonRequest);
     const refreshToken = localStorage.getItem("refreshToken") || "";
     const accesoService = inject(AccesoService)
     return next(clonRequest).pipe(
          catchError((err) => {
               return accesoService.refreshToken(refreshToken).pipe(
                    switchMap((res) => {
                    // Guardar el nuevo token
                    localStorage.setItem('token', res.token);
          
                    const newReq = req.clone({
                    setHeaders: {
                         Authorization: `Bearer ${res.token}`
                    }
                    });
          
                    return next(newReq);
               }),
               catchError((refreshErr) => {
                    const finalError = new Error(refreshErr);
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
          
                    return throwError(() => finalError);
               })
            )
          })
     );
    
};
