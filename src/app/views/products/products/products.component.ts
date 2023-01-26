import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/servises/product.service";
import {HttpClient} from "@angular/common/http";
import {catchError, map, of, retry, Subscription, tap} from "rxjs";
import {Router} from "@angular/router";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  public products: ProductType []= [];
  public loading: boolean = false;

  private subscriptionProducts: Subscription | null = null;
  constructor(private productService:ProductService, private http: HttpClient, private route: Router) {
  }
  ngOnInit() {
 /*   this.products = this.productService.getProducts();*/
    this.loading = true;
this.subscriptionProducts = this.productService.getProducts()
  .pipe(
    tap(()=>{
      this.loading = false;
    })
  )
  .subscribe(
    {
      next:data => {  this.products = data;
        console.log('next')},
      error:(error) => {
        console.log(error);
        this.route.navigate(['/']);
    }

    })

  }

  ngOnDestroy() {
    this.subscriptionProducts?.unsubscribe();
  }
}
