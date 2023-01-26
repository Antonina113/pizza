import {Injectable} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {HttpClient,} from "@angular/common/http";
import { Observable, retry, tap} from "rxjs";
import {environment} from "../../../environment/environment";

@Injectable({
  providedIn:'root'
})
export class ProductService {
  private products: ProductType[] = [];
  constructor(private http: HttpClient) {
  }
  getProducts(): Observable<ProductType[]> {
    return this.http.get< ProductType[]>(environment.apiUrl + 'pizzas')
     ;
  }

  getProduct(id: number): Observable<ProductType>{
    return this.http.get< ProductType>(environment.apiUrl + `pizzas?id=${id}`)
    //ajax
  }
  createOrder(data:{product:string, address: string, phone: string}){
    return this.http.post<{ success: boolean, message?: string}>(environment.apiUrl + `order-pizza`, data)
  }
}
