import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[fdWindow]'
})
export class WindowDirective {

  @Input()
  fdWindow: number;

  constructor() { }

}
