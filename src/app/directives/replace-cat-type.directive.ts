import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appReplaceCatType]'
})
export class ReplaceCatTypeDirective {

  elRef: ElementRef;

  @Input() catType: string;
  constructor(el: ElementRef) {
       this.elRef = el;
  }

  ngOnInit() {
    let value = "";
    this.catType === "e" ? (value = "Expense") : (value = "Income");
    this.elRef.nativeElement.innerText = value;
  }

}
