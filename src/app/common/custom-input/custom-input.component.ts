import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: 'custom-input',
    templateUrl: './custom-input.component.html',
    styleUrls: ['./custom-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomInputComponent),
            multi: true
        }
    ]
})

export class CustomInputComponent implements ControlValueAccessor {
    @Input() bindProp: string;
    constructor() { }

    writeValue(value: any) {
        this.bindProp = value;
    }

    propagateChange = (_: any) => { };

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() { }

    onInputChange(val): void {
        this.propagateChange(val);
    }
}