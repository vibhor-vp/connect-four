import { Component, Input } from "@angular/core";

@Component({
    selector: 'info-card',
    templateUrl: './info-card.component.html',
    styleUrls: ['./info-card.component.scss']
})

export class InfoCardComponent {
    @Input() data;
    constructor() { }
}