import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../../shared/servises/cart.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ProductService} from "../../shared/servises/product.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  constructor(private cartService: CartService, private activateRoute: ActivatedRoute, private productService: ProductService) {
  }

  public formValues = {
    productTitle: '',
    address: '',
    phone: '',
  }
  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;
  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }

  ngOnInit(): void {
   this.subscription =  this.activateRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.formValues.productTitle = params['product'];
      }
    })
    const productParam = this.activateRoute.snapshot.queryParamMap.get('product');
    if (productParam) {
      this.formValues.productTitle = productParam;
    }

  }

  public createOrder() {
    if (!this.formValues.productTitle) {
      alert('Заполните Пиццу');
      return;
    }
    if (!this.formValues.address) {
      alert('Заполните Адрес');
      return;
    }
    if (!this.formValues.phone) {
      alert('Заполните Телефон');
      return;
    }

   this.subscriptionOrder = this.productService.createOrder({
      product: this.formValues.productTitle,
     address: this.formValues.address,
      phone: this.formValues.phone,
    }).subscribe(response =>{
      if(response.success && !response.message){
        alert('Спасибо за заказ');
        this.formValues = {
          productTitle: '',
          address: '',
          phone: '',
        }
      }else {
        alert('Ошибка')
      }
    })


  }

}
