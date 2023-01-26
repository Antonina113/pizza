import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./autch/auth.interceptor";
import {AutchGuard} from "./autch/autch.guard";
import {AutchService} from "./autch/autch.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    AutchGuard,
    AutchService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
