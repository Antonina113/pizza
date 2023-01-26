import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[isChiken]'
})
export class IsChikenDirective {

  constructor(
    private templateRef: TemplateRef<any>,/*содержимое ng-tamplate*/
    private viewContainer: ViewContainerRef
  ) { }
@Input()
  set isChiken(description: string){
    if(description.toLowerCase().includes('кур')){
      this.viewContainer.createEmbeddedView(this.templateRef)}else{
      this.viewContainer.clear();
    }
}

}
