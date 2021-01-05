import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, Type, ViewChild } from "@angular/core";
import { CardContainerModel } from "src/models/card/card-container.model";
import { CardHostDirective } from "./card.directive";

@Component({
    selector: 'card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {
    @Input() cardContainerData: CardContainerModel;
    @ViewChild(CardHostDirective, { static: true }) cardHost: CardHostDirective;
    @Output() cardClickedEvent: EventEmitter<any> = new EventEmitter();
    constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit(): void {
        const _componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.cardContainerData.childComponentObj.childComponent);
        const _viewContainerRef = this.cardHost.viewConatinerRef;
        _viewContainerRef.clear();
        const _componentRef = _viewContainerRef.createComponent(_componentFactory);
        _componentRef.instance.data = this.cardContainerData.childComponentObj.data;
    }

    cardClick(cardDataObj: CardContainerModel): void {
        // this.cardClickedEvent.emit(cardDataObj);
        if (cardDataObj.childComponentObj.data.clickedFn && typeof cardDataObj.childComponentObj.data.clickedFn==='function') {
            cardDataObj.childComponentObj.data.clickedFn();
        }
    }
}
