import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
     // debugger;
     if(req.url.indexOf("auth") > 0)  return next(req);

     const jwt = localStorage.getItem("jwt");
     const clonRequest = req.clone({
          setHeaders:{
               Authorization: `Bearer ${jwt}`
          }
     })
     return next(clonRequest);
    
};
