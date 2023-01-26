import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild,} from '@angular/core';
import {CartService} from "../../../shared/servises/cart.service";
import { map, Subject, Subscription} from "rxjs";


import * as bootstrap from "bootstrap";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PopupComponent} from "../../../shared/components/popup/popup.component";
import {environment} from "../../../../environment/environment";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {

/*  private observable: Observable<number>;*/
  private subscription: Subscription | null = null;
  private subject: Subject<number>;
  constructor(public cartService: CartService, ) {

    this.subject = new Subject<number>;
    let count = 0;
    const interval =setInterval(()=>{
      this.subject.next(count++)
    }, 1000);
    const timeout1 = setTimeout(()=>{
      this.subject.complete()
    }, 4000);


/*    this.observable = from([1, 2, 3, 4, 5])*/
  /*   this.observable = new Observable((observer) =>{
       let count = 0;
       const interval =setInterval(()=>{
         observer.next(count++)
       }, 1000);
       const timeout1 = setTimeout(()=>{
         observer.complete()
       }, 4000);
       const timeout2 = setTimeout(()=>{
         observer.error('world')
       }, 5000);
       return {
         unsubscribe() {
           clearInterval(interval);
           clearTimeout(timeout1);
           clearTimeout(timeout2);
         }
       }
     })*/
  }
@ViewChild(PopupComponent)
private popupComponent!: PopupComponent
  ngAfterViewInit() {
 /*   this.modalService.open(this.popup, {});*/
/*    const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.data = 'Main Component';*/
   /* this.popupComponent.open();*/
  }

  ngOnInit() {
    console.log(environment.production);
    const myModalAlternative = new bootstrap.Modal('#myModal', {});
    myModalAlternative.show();

    this.subscription = this.subject.subscribe({
        next: (params: number) => {
          console.log('subscribe 1: ', params)
        },
        error: (error: string) => {
          console.log('ERROR!!! ' + error)

        }
      })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

  test() {

    this.subject
      .pipe(
        map((number) => {
          return 'Число ' + number*10;
        })
      )
      .subscribe((params:string) => {
      console.log('subscribe 2: ', params)
    })
  }

}
