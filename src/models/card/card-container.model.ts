import { Type } from "@angular/core";
import { EntryCardComponent } from "src/app/common/card/entry-card/entry-card.component";
import { InfoCardComponent } from "src/app/common/card/info-card/info-card.component";

export class CardContainerModel {
    bg_color: string;
    childComponentObj: {
        childComponent: Type<EntryCardComponent | InfoCardComponent>,
        data: CardChildModel;
    };
}

export class CardChildModel {
    id: string;
    title?: string;
    subTitle?: string;
    title1?: string;
    subTitle1?: string;
    type?: string;
    val?: string;
    clickedFn?: Function;
    outputEventFn?: Function;
    img?: string;
    imgBoxColor?: string;
}