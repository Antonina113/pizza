import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrderComponent} from "./order.component";
import {AutchGuard} from "../../core/autch/autch.guard";

const routes: Routes =[
  {path:'', component: OrderComponent, canActivate: [AutchGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
