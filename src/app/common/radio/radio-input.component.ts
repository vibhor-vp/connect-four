import { Component, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: 'radio-input',
    templateUrl: './radio-input.component.html',
    styleUrls: ['./radio-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioInputComponent),
            multi: true
        }
    ]
})

export class RadioInputComponent implements ControlValueAccessor {
    @Input() radioVal: string;
    @Input() radioText: string;
    @Input() name: string;
    // @Input() selected: boolean;
    radioBindingVal: string;
    constructor() { }

    // radioValClicked(event): void {
    //     this.radioValEvent.emit(event.value);
    // }

    writeValue(value: any) {
        this.radioBindingVal = value;
    }

    propagateChange = (_: any) => { };

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() { }

    radioValClicked(val): void {
        this.radioBindingVal = val//.target.value;
        this.propagateChange(this.radioBindingVal);
    }
}