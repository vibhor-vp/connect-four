import { NgModule } from "@angular/core";
import { PlayComponent } from "./play.component";
import { GameComponent } from './game/game.component';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AppCommonModule } from "../common/app-common.module";

const _playRoutes: Routes = [
    { path: '', component: PlayComponent },
];

@NgModule({
    declarations: [PlayComponent, GameComponent],
    imports: [CommonModule, RouterModule.forChild(_playRoutes), AppCommonModule]
})

export class PlayModule {
    constructor() { }
}