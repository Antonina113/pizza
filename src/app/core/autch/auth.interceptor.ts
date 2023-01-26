 import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Observable, tap} from "rxjs";
import {AutchService} from "./autch.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private authService: AutchService){

  }
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

 const authToken = this.authService.getToken();
  const authReq = req.clone({
    headers: req.headers.set('Authorization',authToken)
  });
  return next.handle(authReq)
    .pipe(
      tap({
        next:(event)=>{
          if (event instanceof HttpResponse){
            console.log(event)
          }
        }
      })
    );
}
}
