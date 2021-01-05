import { Component, Input, OnInit } from "@angular/core";
import { iif, Subject } from "rxjs";

@Component({
    selector: 'radio-modal',
    templateUrl: './radio-modal.component.html',
    styleUrls: ['./radio-modal.component.scss']
})

export class RadioModalComponent implements OnInit {
    @Input() modalHeading: string;
    @Input() primaryCTA: string;
    @Input() secondaryCTA: string;
    @Input() radioDataList: Array<any>;
    @Input() primaryCTAFn: Function;
    @Input() radioModalShowSubject: Subject<any>;
    selectedRadioVal: any;
    showModal: boolean;
    constructor() { }

    ngOnInit(): void {
        this.radioModalShowSubject.subscribe((obj) => {
            this.showModal = obj.showModal;
            this.selectedRadioVal = obj.selectedVal;
            this.radioDataList.forEach(rad => {
                rad.selected = rad.val === this.selectedRadioVal ? true : false;
            })
        })
    }

    secondaryCTAClick(): void {
        this.radioModalShowSubject.next(false);
    }

    radioValChanged(val): void {
        let idx = this.radioDataList.findIndex(data => data.val == val);
        this.radioDataList.forEach((data, index) => {
            data.selected = index === idx ? true : false;
        })
    }

    primaryCTAClick(): void {
        // console.log(this.radioDataList)
        let idx = this.radioDataList.findIndex(data => data.selected);
        this.primaryCTAFn(this.radioDataList[idx]);
        this.radioModalShowSubject.next(false);
    }
}