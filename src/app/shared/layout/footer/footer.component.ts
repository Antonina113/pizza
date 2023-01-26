import { Component } from '@angular/core';
import {CartService} from "../../servises/cart.service";

@Component({
  selector: 'footer-components',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(public cartService: CartService) {
  }

}
