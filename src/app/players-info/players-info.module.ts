import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppCommonModule } from "../common/app-common.module";
import { PlayersInfoComponent } from "./players-info.component";

const _playerInfoRoutes: Routes = [
    { path: '', component: PlayersInfoComponent },
];

@NgModule({
    declarations: [PlayersInfoComponent],
    imports: [CommonModule, RouterModule.forChild(_playerInfoRoutes), AppCommonModule]
})

export class PlayersInfoModule {
    constructor() { }
}