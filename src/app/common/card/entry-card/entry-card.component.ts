import { Component, Input } from "@angular/core";

@Component({
    selector: 'entry-card',
    templateUrl: './entry-card.component.html',
    styleUrls: ['./entry-card.component.scss']
})

export class EntryCardComponent {
    @Input() data: any
    public textVal: string;
    constructor() { }

    textChange(val) {
        this.data.outputEventFn({ name: val });
    }
}