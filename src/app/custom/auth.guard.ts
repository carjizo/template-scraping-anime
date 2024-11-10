import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccesoService } from '../services/acceso.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
     // debugger;
     const jwt = localStorage.getItem("jwt") || "";
     const router = inject(Router);

     const accesoService = inject(AccesoService)
     if(jwt != ""){
          // return true;
          return accesoService.validarToken(jwt).pipe(
               map(data => {
                    if(data){
                         return true
                    } else{
                         router.navigate([''])
                         return false;
                    }
               }),
               catchError(error => {
                    router.navigate([''])
                         return of(false);
               })
          )
     }else {
          // router.navigateByUrl("");
          // return false
          const url = router.createUrlTree([""])
          return url;
     }
  
};
