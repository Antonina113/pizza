import {Component, OnInit} from '@angular/core';
import {CartService} from "../../servises/cart.service";
import {AutchService} from "../../../core/autch/autch.service";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public loggedState: boolean = false;

  constructor(public cartService: CartService, private authService: AutchService) {
  }

  ngOnInit() {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.loggedState = isLoggedIn;
      console.log('State has been changed: ' + isLoggedIn)
    })
  }

  login() {
    this.authService.logIn();
  }

  logout() {
    this.authService.logOut();
  }
}
