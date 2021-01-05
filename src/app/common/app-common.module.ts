import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CardComponent } from "./card/card.component";
import { CardHostDirective } from "./card/card.directive";
import { EntryCardComponent } from "./card/entry-card/entry-card.component";
import { InfoCardComponent } from "./card/info-card/info-card.component";
import { CustomInputComponent } from "./custom-input/custom-input.component";
import { RadioModalComponent } from "./radio-modal/radio-modal.component";
import { RadioInputComponent } from "./radio/radio-input.component";

@NgModule({
    declarations: [CardComponent, EntryCardComponent, InfoCardComponent, CardHostDirective, RadioInputComponent, RadioModalComponent, CustomInputComponent],
    imports: [CommonModule, FormsModule],
    exports: [CardComponent, RadioInputComponent, RadioModalComponent, CustomInputComponent]
})

export class AppCommonModule {

}