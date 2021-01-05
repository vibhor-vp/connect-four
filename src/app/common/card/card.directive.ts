import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[cardHost]'
})

export class CardHostDirective {
    constructor(public viewConatinerRef: ViewContainerRef) { }
}